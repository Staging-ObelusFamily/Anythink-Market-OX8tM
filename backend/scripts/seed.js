const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");
const User = mongoose.model("User");
const sampleSize = require('lodash.samplesize');
const { exit } = require('process');

mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);

(async () => {
    // Create 100 users
    // Username: dummy<1-100>
    // Email: dummy<1-100>@company.com
    // Password: 123456
    for (let step = 1; step <= 100; step++) {
        const dummyUser = new User({
            "role": "user",
            "favorites": [],
            "following": [],
            "username": `dummy${step}`,
            "email": `dummy${step}@company.com`,
            "salt": "70d3f4b810a1c43c64a6643b01b873e5",
            "hash": "2d187722601cb9b1d10ad19568d7d731a566024786d9cebafbf6357e3bc9ec647b12093db6ceff21bfa8c14e3a29f37c22b3010ebcb6c694cc4b5813c839bfb02cece1a8b3f989e1397684d75bb9a8c497013eaf258cf4b8aeadcf9fd95969329c18c61c3ec6712113cc35a35ec1e5be8b0965dc54dd5a56ae350d4d5728c4748c14045b38c705eb5ef29a6267f634d2dd24825d2ab7e4d1157f86d21f981a656eb0404e8676688a9aeb6aea9e62dedac9aaec49f5a5e45f084956e1b63686d5b6ce4476486d2923a55d12908b385af58cec19214af47521d08c3a059680e68d2e73815c3469b0dc5aa2035fb33ef9c7d4cd32ced7436a4e68a7d6cbc0e15bd2f67ade074945e415e6a9802fe3c1755b9933fa48e5408f7602fbc0044ead66c484dc16170d3c5f1df871f18a3953da0f593595e2ef7806a5f1c5c87b437a3b5cc51dbab62dfcfba49c8004aa254cbc06f46bb84e16c9713409e7152cbec2c1fd7ac91e5d71637aae0e2bb6b83fcf5cc02e83854aa85c5be09da0bc6d1e8fa667c8d6fbc95ad85e63e28ac3b5868943c3dd1f3e852c36cf8a0aa8b30d6fe5597d0e5a336b54f95c78cb653987b012f8e36f0cf6e976ac81575d73d682104b50bd77b3299d6ccca9aaab25af5adca4442ac7ebaf66ea9716945f02f5560144e1f45ae224a1c89619fa9213f75a29b2a53fcf3ea4f9133d9198acb33a7ffc46bb28",
            "__v": 0,
        });
        
        await dummyUser.save();
    }

    const optionalComments = ["Very cool!", "Seen better", "+1", ":)", ":("];

    for (let step = 1; step <= 500; step++) {
        // Generate some random metadata
        const tagNumber = Math.floor(Math.random() * 10);
        const favCount = Math.floor(Math.random() * 5);
        const seller = (await User.aggregate([{ $sample: { size: 1 } }]))[0];

        const item = new Item({
            "title": `item${step}`,
            "description": `Some item #${step}`,
            "image": "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "favoritesCount": favCount,
            "comments": [],
            "tagList": [
                `tag${tagNumber}`
            ],
            "seller": seller
        });

        // Add comments
        const selectedComments = sampleSize(optionalComments, 2);
        for (const comment in selectedComments) {
            let newComment = new Comment({ body: selectedComments[comment] });
            newComment.item = item;
            newComment.user = (await User.aggregate([{ $sample: { size: 1 } }]))[0];
            await newComment.save();
            item.comments.push(newComment);
        }

        await item.save();
    }

    exit();
})();