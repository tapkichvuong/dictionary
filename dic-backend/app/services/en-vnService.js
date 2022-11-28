const { ObjectId } = require("mongodb");

class EngWordService {
    constructor(client) {
        this.word = client.db().collection("EN-VN");
    }
    // define database access methods using mongodb API
    extraWordData(payload) {
        const word = {
            tu: payload.english,
            phienam: payload.spelling,
            dang: payload.form,
            nghia: payload.viet,
            vidu: payload.example,
        }
        //remove undefined fields
        Object.keys(word).forEach(
            (key) => word[key] === undefined && delete word[key]
        );
        return word;
    }

    async create(payload) {
        const word = this.extraWordData(payload);
        const result = await this.word.findOneAndUpdate(
            word, 
            { $set: {example: word.example}},
            { returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    async find(filter) {
        const  cursor = await this.word.find(filter);
        return await cursor.toArray();
    }

    async findByName(word){
        return await this.find({
            english: {$regex: new RegExp(word), $options: "i"},
        });
    }

    async findById(id) {
        return await this.word.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter  = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extraWordData(payload);
        const result  =await this.word.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.word.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
        return result.value;
    }

    async deleteAll(){
        const result  = await this.word.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = EngWordService;