const fs = require('fs')
const chalk = require('chalk')

const addNotes = function(title, body){
   // const stringified = JSON.stringify(notes)
    const existingNotes = loadNotes()
    const duplicacy = existingNotes.filter(function(note){
        return note.title === title
    })
    //console.log(duplicacy)
    if(duplicacy.length===0){
        existingNotes.push({
            title: title,
            body: body
        })
        const stringified = JSON.stringify(existingNotes)
        saveNotes(stringified)
        console.log(chalk.green("Note Saved!"))
    }
    else{
        console.log(chalk.red("A note with given title already exists!"))
    }

}

const saveNotes = function(notes){
    fs.writeFileSync('dataNotes.json',notes)
}

const loadNotes = function(){
    try{
        const data = fs.readFileSync('dataNotes.json')
        const buffer = data.toString()
        const parsedJson = JSON.parse(buffer)
        return parsedJson
    }catch(e){
        return []
    }
}

const removeNote = function(title){
    const notes = loadNotes()
    //console.log("Note to be removed = "+ title)
    const delNote = notes.filter(function(note){
        return note.title!==title
    })
    if(notes.length === delNote.length){
        console.log(chalk.red("No Such Note Found!"))
    }
    else{
        console.log(chalk.green("Note Deleted Successfully!"))
    }
    const stringed = JSON.stringify(delNote)
    saveNotes(stringed)
}

const listNotes = ()=>{
    const loadedNotes = loadNotes()
    console.log(chalk.greenBright("-->Your Notes<--"))
    loadedNotes.forEach(element => {
        console.log("     "+chalk.red(element.title))
        console.log(chalk.green(element.body))
        console.log()
    });
}

const readNotes = (title)=>{
    const loadedNotes = loadNotes()
    var flag = false
    flag = loadedNotes.find((event)=>{
        if(event.title===title){
            console.log(chalk.green(event.body))
            return true;
        }
    })
    if(!flag){
        console.log(chalk.red("Cannot find note with title "+title))
    }
}

module.exports = {
    addNotes: addNotes,
    loadNotes: loadNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}