import { addNote, removeNote, listNotes, readNote } from './notes';
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler({ title, body }: { [key: string]: string }) {
        addNote(title, body);
    },
});

yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler({ title }: { [key: string]: string }) {
        removeNote(title);
    },
});

yargs.command({
    command: 'read',
    describe: 'Reading note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler({ title }: { [key: string]: string }) {
        readNote(title)
    },
});

yargs.command({
    command: 'list',
    describe: 'Lists notes',
    handler() {
        listNotes();
    },
});

yargs.parse();
