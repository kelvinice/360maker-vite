export default class FileManagement {
    static readFile = async (filepath: string) => {
        return await fetch(filepath).then(response => response);
    }
}