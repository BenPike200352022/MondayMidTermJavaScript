const mongoose = require(`mongoose`);

const MetahumanSchema = new mongoose.Schema({

    alias: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Superhero', 'Villain', 'Antihero'],
        default: 'Superhero'
    }
}, 
 {
    timestamps: true
 }
);

module.exports = mongoose.model('Metahuman', MetahumanSchema);