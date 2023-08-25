import express from 'express';
import bodyParser from 'body-parser';

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();

app.use(bodyParser.json());

/**
 * Liste aller ToDos. 
 * Wird später durch Datenbank ersetzt!
 */
let TODOS = [
    {
        "id": 1671056616571,
        "title": "Übung 4 machen",
        "due": "2022-11-12T00:00:00.000Z",
        "status": 0
    },
    {
        "id": 1671087245763,
        "title": "Für die Klausur Webentwicklung lernen",
        "due": "2023-01-14T00:00:00.000Z",
        "status": 2
    },
];

/**
 * TODOS als JSON-Antwort zurückgeben
 */
app.get('/todos', (request, response) => {

    const todos = TODOS;

    // todos als JSON-Antwort senden
    response.json(todos);

});

app.get('/todos/:id', (request, response) => {

    // request.params.id kann alphanumerisch sein, deshalb in Typ number konvertieren
    const id = parseInt(request.params.id);

    // Todo nach id filtern
    const todo =
        TODOS
            .find(item => item.id === id);

    // Prüfen, ob der gesuchte Eintrag vorhanden ist
    if (todo === undefined)
    {
        response.status(404).send(`todo with id ${id} not found`);
        return;
    }

    // Todo als JSON-Antwort senden
    response.json(todo);

})

/**
 * Todo anlegen
 */
app.post('/todos', (request, response) => {

    // geparsten Inhalt an todo übergeben
    const todo = request.body;

    // todo an TODOS übergeben
    TODOS.push(todo);

    // Status und Antwort als Response senden
    response.status(200).send('todo angelegt');

});

/**
 * Todo mit bestimmter Id aktualisieren
 */
app.put('/todos/:id', (request, response) => {

    // request.params.id kann alphanumerisch sein, deshalb in Typ number konvertieren
    const id = parseInt(request.params.id);

    // Index des zu aktualisierenden Eintrag ermitteln
    const index = TODOS.findIndex(item => item.id === id);

    TODOS[index] = request.body;

    // Status und Antwort als Response senden
    response.status(200).json(request.body);

})

/**
 * Todo mit bestimmter Id löschen
 */
app.delete('/todos/:id', (request, response) => {

    // request.params.id kann alphanumerisch sein, deshalb in Typ number konvertieren
    const id = parseInt(request.params.id);

    // Todos filtern, das die betreffende Id nicht mehr im Ergebnis zu finden ist
    TODOS = TODOS.filter(item => item.id !== id);

    // Status senden
    response.sendStatus(204);

});

// Port, auf dem die Anwendung laufen soll
const PORT = process.env.PORT || 3000;

// express starten und oben genannten Port abonnieren
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
