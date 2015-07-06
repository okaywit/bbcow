package com.bbcow.db;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.bson.Document;

import com.bbcow.po.Paper;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;

/**
 * mogodb
 * 
 * @author 大辉Face
 */
public class MongoPool {
        private static MongoClient mongoClient;
        private static MongoDatabase db;
        static {
                mongoClient = new MongoClient("127.0.0.1", 27017);
                db = mongoClient.getDatabase("okaywit");
        }

        public static List<String> findAllWithJson() {
                FindIterable<Document> iterable = db.getCollection("paper").find();
                final List<String> jsons = new LinkedList<String>();
                iterable.forEach(new Block<Document>() {
                        @Override
                        public void apply(final Document document) {
                                jsons.add(document.toJson());
                        }
                });
                return jsons;
        }

        public static void insertPaper(Paper paper) {
                db.getCollection("paper").insertOne(
                        new Document("id", paper.getId())
                                .append("title", paper.getTitle())
                                .append("content", paper.getContent())
                                .append("contactName", paper.getContactName())
                                .append("contactTel", paper.getContactTel())
                                .append("tag", paper.getTag())
                                .append("imgUrl", paper.getImgUrl())
                                .append("createDate", new Date())
                                .append("goodCount", paper.getGoodCount())
                                .append("badCount", paper.getBadCount()));
        }
}
