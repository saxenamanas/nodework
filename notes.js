const ch = require('chalk')
const yargs = require('yargs')
const func = require('./more.js')

yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder:{
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body',
            demandOption: true,
            type: 'string'
        }
    },

    handler: function(argv){
        func.addNotes(argv.title,argv.body)
    }
})


yargs.command({
    command: 'remove',
    describe: 'remove a new note',
    builder:{
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        func.removeNote(argv.title)
    }
})


yargs.command({
    command: 'list',
    describe: 'listing a new note',
    handler: function(argv){
        func.listNotes()
    }
})


yargs.command({
    command: 'read',
    describe: 'read a from the list note',
    builder:{
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        func.readNotes(argv.title)
    }
})
yargs.parse()

//console.log(yargs.argv)