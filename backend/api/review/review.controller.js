const logger = require('../../services/logger.service');
const boardService = require('../board/board.service');
const userService = require('../user/user.service');
const authService = require('../auth/auth.service');
const reviewService = require('./review.service')

// TODO: needs error handling! try, catch

async function getReviews(req, res) {
    try {
        // console.log('reviews', req.query)
        const reviews = await reviewService.query(req.query)

        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err);
        res.status(500).send({ error: 'cannot get reviews' })

    }
}

async function deleteReview(req, res) {
    try {
        const { deletedCount } = await reviewService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove review' })
        }
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}

async function addReview(req, res) {
    var loggedinUser = authService.validateToken(req.cookies.loginToken)

    try {
        const review = req.body
        review.userId = loggedinUser._id

        console.log('review', review)
        const addedReview = await reviewService.add(review)
        console.log('review', addedReview)

        // prepare the updated review for sending out
        addedReview.byUser = await userService.getById(addedReview.userId.toString())
        addedReview.aboutBoard = await boardService.getById(addedReview.boardId.toString())

        // Give the user credit for adding a review
        loggedinUser.score = loggedinUser.score ? 10 : loggedinUser.score + 10
        await userService.update(loggedinUser)

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        res.send(addedReview)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}