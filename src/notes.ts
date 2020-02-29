const fs = require('fs');
const chalk = require('chalk');

interface Note {
  title: string;
  body: string;
}

export const addNote = (title: string, body: string) => {
  const notes = loadNotes();

  if (!notes.find((note: Note) => note.title === title)) {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
    console.log(chalk.green('Note added'));
  } else {
    console.log(chalk.red('Duplicate note!'));
  }
};

export const removeNote = (title: string) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note: Note) => note.title !== title);
  if (filteredNotes.length !== notes.length) {
    console.log(chalk.green(`Removed note with title: ${title}`));
    saveNotes(filteredNotes);
  } else {
    console.log(chalk.red(`No note found!`));
  }
};

export const listNotes = () =>
  console.log(
    chalk.green.inverse(
      loadNotes().map(({ title }: { [key: string]: string }) => title)
    )
  );

export const readNote = (title: string) => {
  const notes = loadNotes();
  const note = notes.find((note: Note) => note.title === title);
  if (note) {
    console.log(chalk.green.italic(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red("Couldn't find note!"));
  }
};

export const saveNotes = (notes: Note[]) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

export const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
