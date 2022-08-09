// nous allons créer des fonctions ressemblant aux mdn
const Blog = require('../models/blogs.js');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: 'desc' })
        .then((result) => {
            res.render('blogs/index', {title: 'All Blogs', blogs: result})
        }).catch((err) => {
            console.log(err)
        })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', {blog: result, title: 'Blog Details'})
        })
        .catch((err) => {
            res.status(404).render('404', {title: 'Blog not found'})
        })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create a new blog'});
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    // on ne fait pas une redirection on va plutot envoyer les données aux navigateurs au format json
    // puisque dans le javascript on fait de l'ajax request, quand  on fait ce type de requête dans node on ne peut pas utiliser de redirection on doit
    // envoyer soit du text ou du json au navigateur qui va contenir la redirection
    Blog.findByIdAndDelete(id)
        .then((result) => {
            //on envoie un json object au navigateur
            res.json({redirect: '/blogs'})
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    blog_index, 
    blog_details, 
    blog_create_get,
    blog_create_post,
    blog_delete
}