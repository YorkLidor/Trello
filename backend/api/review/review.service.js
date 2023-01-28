
const asyncLocalStorage = require('../../services/als.service')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const collectionName = 'review'

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection(collectionName)
        // const reviews = await collection.find(criteria).toArray();
        var reviews = await collection.aggregate([
            {
                // Filter inside aggregation
                $match: criteria
            },
            {
                $lookup://go fetch
                {

                    //The "foreign" collection name to fetch from
                    from: 'user',

                    //Specify the field name inside each local item (review)
                    //to search for in the foreign collection (user)
                    localField: 'userId',

                    //Specify the field name in the foriegn (user) collection ->
                    //only the matching ones will be inserted to the review.
                    foreignField: '_id',

                    //Specify the field name that will be inserted 
                    //and passing a value of the matching user obj.(AS AN ARRAY)
                    as: 'byUser'
                }
            },
            {
                //Flatten array to an object -!!!
                //(done ONLY when WE KNOW there's only one item found to be found)
                $unwind: '$byUser'

            },
            {
                $lookup:
                {
                    from: 'toy',
                    localField: 'toyId',
                    foreignField: '_id',
                    as: 'aboutToy'
                },
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()
        // Clean up unneeded feilds from toy, user and review
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, username: review.byUser.username }
            review.aboutToy = { _id: review.aboutToy._id, toyname: review.aboutToy.name }
            review.createdAt = ObjectId(review._id).getTimestamp()
            delete review.userId;
            delete review.toyId;
            return review;
        })
        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        return await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    const reviewToAdd = _createReview(review)
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(reviewToAdd);
        return reviewToAdd;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _createReview(review) {
    // peek only updatable fields!
    // Wrap ids inside objectId - so now you can use getTimestamp and etc...
    return {
        rate: review.rate,
        txt: review.txt,
        userId: ObjectId(review.userId),
        toyId: ObjectId(review.toyId),
        createdAt: Date.now()
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};

    if (filterBy.userId) criteria.userId = ObjectId(filterBy.userId)
    if (filterBy.toyId) criteria.toyId = ObjectId(filterBy.toyId)

    console.log('filterBy', criteria)
    return criteria

    //fancy way - Possible only because the filter options are either toy id or user id
    for (const key in filterBy) {
        criteria[key] = ObjectId(filterBy[key])
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


