const mongoose = require('mongoose');
// schema est ce qui decrit la structure du document qu'on veut stoker dans notre base de données 
const Schema = mongoose.Schema;

// creation du schema definition de la structure 
// on peut passer un second argument à new schema qui est timestamp qui permet de stocker la date de création du document et d'autre chose
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

// est ce qui surround et pourvoit une interface pour manipuler les documents de notre base de données
// le premier argument est le nom de la collection dans laquelle on veut stocker les documents, c'est important car il va voir ce nom, le plurarilisé et regarder pour la collection dans la base de donnée chaque fois qu'o va utilisé Blog.
// le deuxième argument est le schema qui décrit la structure des documents que l'on veut stocker dans la base de données
const Blog = mongoose.model('Blog', blogSchema);
//on export le modème
module.exports = Blog;
