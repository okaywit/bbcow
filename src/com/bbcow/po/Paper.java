package com.bbcow.po;

public class Paper {
        private long id;
        private String title;
        private String content;
        private String contactName;
        private String contactTel;
        private String tag;
        private String imgUrl;

        public long getId() {
                return id;
        }

        public void setId(long id) {
                this.id = id;
        }

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public String getContent() {
                return content;
        }

        public void setContent(String content) {
                this.content = content;
        }

        public String getContactName() {
                return contactName;
        }

        public void setContactName(String contactName) {
                this.contactName = contactName;
        }

        public String getContactTel() {
                return contactTel;
        }

        public void setContactTel(String contactTel) {
                this.contactTel = contactTel;
        }

        public String getTag() {
                return tag;
        }

        public void setTag(String tag) {
                this.tag = tag;
        }

        public String getImgUrl() {
                return imgUrl;
        }

        public void setImgUrl(String imgUrl) {
                this.imgUrl = imgUrl;
        }

}
