const Link = require('../models/Link');
const Comment = require('../models/Comment');

// GET
exports.getAllLinks = async (req, res) => {
    try {
        const links = await Link.find().sort({ createdAt: -1 });
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    }

}

// GET /:id -> je veux le link avec l'id 1
exports.getLinkById = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'link not found' });
        }
        return res.status(200).json(link);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    }
}

// POST = création d'un link
exports.createLink = async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = new Link({
        title: title,
        url: url,
        description: description,
        user: req.user.id
    });
    try {
        const savedLink = await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        res.status(400).json({ message: 'Erreur de validation : ' + error.message });
    }
}

// PUT = Modification d'un lin /:id
exports.updateLinkById = async (req, res) => {
    try {
        const updatedLink = await Link.findByIdAndUpdate(
            req.params.id, // ID à mettre à jour
            req.body, // Données à mettre à jour
            {
                new: true,
                runValidators: true
            });
        if (!updatedLink) {
            return res.status(404).json({ message: 'link not found' });
        }
        res.status(200).json(updatedLink);
    } catch (error) {
        res.status(400).json({ message: 'Erreur de validation : ' + error.message });
    }
}

// DELETE /:id
exports.deleteLinkById = async (req, res) => {
    try {
        const deletedLink = Link.findByIdAndDelete(req.params.id)
        if (!deletedLink) {
            return res.status(404).json({ message: 'link not found' });
        }
        res.status(204).send();

    } catch (error) {
        res.status(400).json({ message: 'Erreur de suppression : ' + error.message });
    }
}