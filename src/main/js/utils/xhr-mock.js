import db from '../db'

/*
 * url: /collection [/id] (/collection [/id])+
 * /categories
 * /categories/42
 * /categories/42/subCategories
 * /categories/42/subCategories/20
 * /categories/42/subCategories/20/items
 */
const xhr = {
    // [LIST] [FIND] /categories, /categories/42
    get(url){
        return promise(() => {
            let {collection, element} = navigate(url);
            return element || collection;
        });
    },

    // [CREATE] /categories {data}, /categories/42/subCategories {data}
    post(url, data){
        return promise(() => {
            let {collection} = navigate(url);
            data.id = generateId();
            collection.push(data);
            return data;
        });
    },

    // [UPDATE] /categories/42 {data}, /categories/42/subCategories/20 {data}
    put(url, data){
        return promise(() => {
            let {element} = navigate(url);
            Object.assign(element, data);
            return element;
        });
    },

    // [DELETE] /categories/42, /categories/42/subCategories/20
    delete(url){
        return promise(() => {
            let {collection, element} = navigate(url);
            let index = collection.findIndex(element => element.id == element.id);
            collection.splice(index, 1); // remove 1 element at index
            return element;
        });
    }
}

const REQUESTS_TIMEOUT_MS = window.REQUESTS_TIMEOUT_MS != null ? window.REQUESTS_TIMEOUT_MS : 500;

function promise(callback){
    return new Promise((resolve, reject) => {
        console.log("Requesting...");

        let execute = () => {
            let data = callback();
            console.log("Response:", data);
            resolve(data);
        }

        if(REQUESTS_TIMEOUT_MS > 0) {
            setTimeout(execute, REQUESTS_TIMEOUT_MS);
        } else {
            execute();
        }
    });
}

/**
 * entrada: /categories/42/subCategories/20/items
 * =>: ["categories", 42, "subCategories", 20, "items"]
 * saída: [
 *      {collection: "categories", id: 42},
 *      {collection: "subCategories", id: 20},
 *      {collection: "items", id: null}
 * ]
 */
function navigate(url){
    let parts = url.split("/").filter(it => it !== "");
    let collectionsIds = [];

    for(let i = 0; i < parts.length; i =  i + 2){
        collectionsIds.push({
            collection: parts[i],
            id: parts[i + 1] && parseInt(parts[i + 1])
        });
    }

    let collection = null;
    let element = db;

    for (let ci of collectionsIds) {
        collection = element[ci.collection];

        if(!ci.id){
            element = null;
            break;
        }

        if(!Array.isArray(collection)) throw new Error("");

        element = collection.find(it => it.id == ci.id);
        if(!element) throw new Error("Elemento ${ci} não encontrado");
    }

    if(!collection) throw new Error("");

    return {collection, element};
}

function generateId(){
    // random inteiro no intervalo [0, 10.000.000]
    return Math.floor(Math.random()*10000000);
}

export default xhr