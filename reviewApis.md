## Review APIs

### GET /api/reviews/get-all

    no inputs

### GET /api/reviews/by-user-id

    params: id

### GET /api/reviews/by-review-id

    params: id

### GET /api/reviews/by-menu-item-id

    params: id

### POST /api/reviews/create-new

    body: {
        userId,
        username,
        title,
        content,
        menuItemId
    }

### PATCH /api/reviews/update

    body: {
        _id,
        userId,
        username,
        title,
        content,
        menuItemId
    }

### DELETE /api/reviews/delete

    body: _id
