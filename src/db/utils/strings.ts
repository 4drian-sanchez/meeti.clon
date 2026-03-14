export const pluralize = ( word: string, count: number ) => {
    if( count === 1 ) return word

    const vocals = ['a', 'e', 'i', 'o', 'u']
    const lastLetter = word[word.length - 1].toLowerCase()

    if(vocals.includes(lastLetter)) {
        return word + 's'
    }

    console.log(lastLetter)

    return word + 'es'
}