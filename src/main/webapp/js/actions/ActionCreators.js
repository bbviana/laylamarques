var ActionTypes = require('./ActionTypes');
var dispatch = require('app/flux/Dispatcher').dispatch;
var invariant = require('app/utils/invariant');
var navigate = require('react-mini-router').navigate;


var ActionCreators = {
    loadBGImages: function () {
        BackgroundClient
            .all()
            .then(function (data) {
                dispatch({action: ActionTypes.RECEIVE_BG_IMAGES, images: data});
            }, handleError);
    },

    loadItemsByCategory: function (categoryId) {
        this.loading(true);
        dispatch({action: ActionTypes.LOAD_ITEMS_BY_CATEGORY, categoryId: categoryId});

        ItemClient
            .byCategory(categoryId)
            .then(function (data) {
                dispatch({action: ActionTypes.RECEIVE_ITEMS, items: data});
                ActionCreators.loading(false);
            }, handleError);
    },

    loadCategories: function () {
        this.loading(true);
        dispatch({action: ActionTypes.LOAD_CATEGORIES});

        CategoryClient
            .all()
            .then(function (data) {
                dispatch({action: ActionTypes.RECEIVE_CATEGORIES, categories: data});
                ActionCreators.loading(false);
            }, handleError);
    },

    loading: function (loading) {
        dispatch({action: ActionTypes.CHANGE_LOADING, loading: loading});
    }
};

function handleError(error) {
    dispatch({action: ActionTypes.ACTION_FAILED, message: error});
    ActionCreators.loading(false);
}


module.exports = ActionCreators;