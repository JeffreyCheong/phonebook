const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const app = express();
let db = {};
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const CONTACTS_COLLECTION = 'contacts';
let ObjectID = mongodb.ObjectID;

mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/axrail_phone', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  // Save database object from the callback for reuse.
  db = client.db();
  console.log('Database connection ready');

  // Initialize the app.
  const server = app.listen(PORT, () => {
        const port = server.address().port;
        console.log(`Server running on ${port}`)
    });
});

function handleError(res, reason, message, code) {
    console.log('ERROR: ' + reason);
    res.status(code || 500).json({'error': message});
}

app.get('/api', (req, res) => {
    res.json({
        message: 'API called success'
    })
});

app.get("/api/contacts", function(req, res) {
    try {
        db.collection(CONTACTS_COLLECTION).find({}).toArray((err, docs) => {
            if (err) {
                throw(err);
            } else {
              res.status(200).json(docs);
            }
          });
    } catch (error) {
        handleError(res, err.message, "Failed to get contacts.");
    }
    
  });

app.post('/api/contacts', (req, res) => {
    const newContact = req.body;
    newContact.createDate = new Date();

    try {
        db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
            if (err) {
                throw(err);
            } else {
              res.status(201).json(doc.ops[0]);
            }
          });
    } catch (error) {
        handleError(res, error, 'API has hit an error! ')
    }
});

app.get("/api/contact/:id", function(req, res) {
    try {
        db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, (err, doc) => {
            if (err) {
              throw(err);
            } else {
              res.status(200).json(doc);
            }
          });
    } catch (error) {
        handleError(res, error.message, "Failed to get contact");
    }
    
  });
  
  app.put("/api/contact/:id", (req, res) => {
    const updateDoc = req.body;
    delete updateDoc._id;
    try {
        db.collection(CONTACTS_COLLECTION).updateOne(
            { _id: new ObjectID(req.params.id) }, 
            { $set: updateDoc },
            { upsert: true }, (err, doc) => {  
                if (err) {
                    throw(err);
                } else {
                    updateDoc._id = req.params.id;
                    res.status(200).json(updateDoc);
                }
        });
    } catch (error) {
        handleError(res, error.message, "Failed to update contact");
    }
     
  });
  
  app.delete("/api/contact/:id", (req, res) => {
      try {
        db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, (err, result) => {
            if (err) {
              throw(err);
            } else {
              res.status(200).json({message: `Deleted contact`});
            }
          });
      } catch (error) {
        handleError(res, error.message, "Failed to delete contact");
      }
    
  });

  app.get("/api/contacts/:query", (req, res) => {
    let query = req.params.query;
    console.log(query);
    try {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        db.collection(CONTACTS_COLLECTION).find(
            {
                $or: [
                {lastName: {$regex: query}}, 
                {firstName: {$regex: query}}
            ]
        }).toArray((err, docs) => {
            if(err) {
                throw(err);
            } else {
                res.status(200).json(docs);
            }
        });
    } catch (error) {
        handleError(res, error.message, "Error find a contact");
    }
  });