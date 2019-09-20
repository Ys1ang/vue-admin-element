import Vue from 'vue'

import {bannerType} from  '../const/const.js'

Vue.filter('filterBannerType', function (type ) {
    let banner = bannerType[type]?  bannerType[type] : '';
    return  banner;
})
