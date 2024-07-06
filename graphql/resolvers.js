//function related to typedefs
const data = {
    authors: [{
            id: "1",
            name: "Kate Chopin",
            books: ["1"]
        },
        {
            id: "2",
            name: "Paul Auster",
            books: ["2"]
        }
    ],
    books: [
        {
          id: "1",
          title: 'The Awakening',
          author: "1",
          publishedYear: 2022
        },
        {
          id: "2",
          title: 'City of Glass',
          author: "2",
          publishedYear: 2023
        },
        {
            id: "3",
            title: 'Desire',
            author: "2",
            publishedYear: 2010
        },
    ]
};

export const resolvers = {
    Book: {
        author: (parent, args, context, info) => {
            return data.authors.find(eachAuthor => eachAuthor.id === parent.author)
        },
    },
    Author: {
        books: (parent, args, context, info) => {
            return data.books.filter(eachBook => parent.books.includes(eachBook.id))
        }
    },
    Query: {
        authors : () => {
            //we basically do DB requests here
            return data.authors
        },
        books : () => {
            return data.books
        }
    },
    Mutation: {
        addBook: (parent, args, context, info) => {
            //args is giving all the data (body)
            let newBook = {
                ...args,
                id: data.books.length + 1
            }
            data.books.push(newBook)
            
            return newBook;
        }
    }
}