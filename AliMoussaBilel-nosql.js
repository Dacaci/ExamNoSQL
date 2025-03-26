// 1.a Insertion "Lego Creator 3-in-1"
db.examlegoSQL.insertOne({
    "nom": "Lego Creator 3-in-1",
    "annee_sortie": 2020,
    "nombre_de_pieces": 564,
    "prix": 59.99,
    "evaluations": [
        {
            "utilisateur": "Charlie",
            "note": 4
        }
    ]
});

// 1.b Insertion "Faucon Millenium"
db.examlegoSQL.insertOne({
    "nom": "Faucon Millenium",
    "annee_sortie": 2019,
    "nombre_de_pieces": 1050,
    "prix": 89.99,
    "theme": "Star Wars",
    "evaluations": [
        {
            "utilisateur": "David",
            "note": 5
        },
        {
            "utilisateur": "Eve", 
            "note": 3
        }
    ]
});

// 2.a 
db.examlegoSQL.updateOne(
    { "nom": "Lego Creator 3-in-1" },
    { $set: { "prix": 49.99 } }
);

// 2.b 
db.examlegoSQL.updateOne(
    { "nom": "Faucon Millenium" },
    { $push: { "evaluations": { "utilisateur": "Frank", "note": 4 } } }
);

// 3.a 
db.examlegoSQL.find(
    { "theme": "Star Wars" }
).sort({ "annee_sortie": -1 });

// 3.b
db.examlegoSQL.find(
    { "prix": { $gt: 100 } }
).sort({ "nombre_de_pieces": -1 });

// 3.c
db.examlegoSQL.find(
    {}, 
    { "nom": 1, "nombre_de_figures": 1, "_id": 0 }
).sort({ "nombre_de_figures": -1 }).limit(3);

// 3.d
db.examlegoSQL.find(
    { "evaluations.note": { $gte: 4 } }
);

// 3.e
db.examlegoSQL.find(
    { 
        "theme": { $in: ["Technic", "Creator"] },
        "nombre_de_pieces": { $lt: 2000 }
    }
);

// 3.f
db.examlegoSQL.find(
    {
        "theme": "Harry Potter",
        "annee_sortie": { $gte: 2000, $lte: 2010 }
    }
);

// 3.g
db.examlegoSQL.aggregate([
    {
        $addFields: {
            moyenne_note: {
                $avg: "$evaluations.note"
            }
        }
    },
    {
        $match: {
            'nombre_de_pieces': { $gt: 1000 },
            moyenne_note: { $gte: 4 }
        }
    }
]);

// 3.h
db.examlegoSQL.find(
    {
        "evaluations.note": 5,
        "evaluations.note": { $nin: [1, 2, 3, 4] }
    }
);

// 4.a
db.examlegoSQL.updateOne(
    { 
        "nom": "Faucon Millenium", 
        "annee_sortie": 2019 
    },
    { 
        $pull: { 
            "evaluations": { "utilisateur": "Bob" } 
        } 
    }
);

// 4.b
db.examlegoSQL.deleteMany(
    { 
        "nombre_de_pieces": { $lt: 1000 } 
    }
);