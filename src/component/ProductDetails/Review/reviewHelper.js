export const reviewActionType = {
    'REVIEW_REVIEW':'REVIEW_REVIEW',
    'REVIEW_SORT':'REVIEW_SORT',
    'REVIEW_FILTER':'REVIEW_FILTER',
    'REVIEW_COMMENT':'REVIEW_COMMENT',
}

export const reviewFilter = {
    fiveStars : false,
    fourStars : false,
    threeStars : false,
    twoStars : false,
    oneStar : false,
    photo : false,
}

export const reviewSortBy = [
    {
        value: 1,
        label: 'Most Recent'
    },
    {
        value: 2,
        label: 'Most Helpful'
    },
    {
        value: 3,
        label: 'Highest to Lowest Rating'
    },
    {
        value: 4,
        label: 'Lowest to Highest Rating'
    }
]

export const ReviewData =
    [
        {
            'userID': `Eliza Koedding`,
            'rating': 5,
            'timeStamp': 'Aug 28 2022 19:00:00',
            'reviewTitle': 'SO Comfortable! SO Cute!',
            'reviewBody': "This jacket is super comfy and goes with every outfit. I would say if you have long arms and plan to use the thumb holes, size up! But I went with a small and even though I have long arms I am very happ with the fit!\n"
               ,
            'numberLiked': 0,
            'image': [],
            'comments': [],
            'usualSize': 'Small',
            'sizePurchased': 'Small',
            'fits': 'True to size'
        },
        {
            'userID': `Laurie R`,
            'rating': 4,
            'timeStamp': 'Sep 17 2022 12:34:56',
            'reviewTitle': 'Cute, but could be better',
            'reviewBody': "As others have stated this runs smaller than other Scubas. I bought both the black and white, but returned the white because it looked very dingy to me. The black is nicer in my opinion, but I did expect the fleece to be a little better quality for the price honestly."
            ,
            'numberLiked': 3,
            'image': [],
            'comments': [],
            'usualSize': 'M/L',
            'sizePurchased': 'M/L',
            'fits': 'Runs a bit small'
        },
        {
            'userID': `Aly B`,
            'rating': 3,
            'timeStamp': 'Sep 21 2022 23:45:67',
            'reviewTitle': 'Cozy and perfect for fall / winter',
            'reviewBody': "This is so comfy and warm. I LOVE this version of the scuba. Would also love to see an oversized scuba fleece full zip. The quality is amazing - it’s a splurge but worth it.\n" +
                "Fit is slightly smaller than the regular scubas."
            ,
            'numberLiked': 3,
            'image': [],
            'comments': [],
            'usualSize': '4 / 6',
            'sizePurchased': 'M/L',
            'fits': 'Runs a bit small'
        },
    ]