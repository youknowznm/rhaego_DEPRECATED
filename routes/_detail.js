let articleProxy = require('../proxy/article')
let controllers = require('../utils/controllers')

module.exports = function(router) {

    /*
    详情/编辑页
    - 以文章uid为标识
    - 当query的editing为真时进入编辑页
    */
    router.get(/^\/articles\/\S+/, function(req, res, next) {
        let parsedRegExpr = /^\/articles\/(\S+)/.exec(req.path)
        let _id = parsedRegExpr[1]
        let editing = (req.query !== undefined) ? (req.query.editing === 'true') : false
        articleProxy.getArticleById(_id, function(doc) {
            if (doc === null) {
                controllers.render404(req, res, next)
            } else {
                let navType = doc.type === 'post' ? 0 : 1
                if (editing === true) {
                    res.render('edit', {
                        navType,
                        pageTitle: 'edit',
                        static: 'edit',
                        authLevel: controllers.getAuthLevel(req),
                        doc,
                    })
                } else {
                    res.render('detail', {
                        navType,
                        pageTitle: doc.title,
                        static: 'detail',
                        authLevel: controllers.getAuthLevel(req),
                        doc,
                    })
                }
            }
        })
    })

    return router

}