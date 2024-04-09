{
    let createPost = function () {
        let newPost = $('#new-post-form');

        newPost.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPost.serialize(),
                success: function (data) {
                    let Post = newPostDom(data.data.post);
                    $('#post-list-cointainer').prepend(Post);
                    deletePost($(` .delete-post-button`, Post));

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        })
    }
    let newPostDom = function (post) {
        return $(
            `
        <li id="post-${post._id}">
        <p>
        
            <small>
                <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
            </small>
                <span>
                ${post.content}
                </span>
                <span>
                ${post.user.name}
                </span>
    </p>
    <div id="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="comment" placeholder="express your comments">
                <input type="hidden" name="post" value=${post._id}>
                <input type="submit" value="Add comment">
            </form>
    </div>
</li>

<script src="/js/home_post.js"></script>
`)
    }


    // method to delete the post
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}

// create a post in DOM