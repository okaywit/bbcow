package com.bbcow.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import com.bbcow.po.DailyMain;

public class HtmlParser {

        public static DailyMain getWikiMain() {
                InputStream is = null;
                BufferedReader br = null;
                DailyMain wm = new DailyMain();

                HttpClient client = new DefaultHttpClient();
                try {
                        HttpResponse response = client.execute(new HttpGet("https://en.m.wikipedia.org/wiki/Main_Page"));
                        HttpEntity entity = response.getEntity();

                        is = entity.getContent();

                        br = new BufferedReader(new InputStreamReader(is, "utf-8"));
                        br.skip(8721l);

                        char[] cs = new char[1000];
                        br.read(cs);

                        StringBuffer str = new StringBuffer();
                        for (char c : cs) {
                                str.append(c);
                        }
                        str.delete(0, str.indexOf("src") + 5);
                        wm.setImgUrl("https:" + str.substring(0, str.indexOf("\"")));
                        str.delete(0, str.indexOf("href") + 6);
                        wm.setLinkUrl("https://en.m.wikipedia.org" + str.substring(0, str.indexOf("\"")));
                        str.delete(0, str.indexOf("title") + 7);
                        wm.setTitle(str.substring(0, str.indexOf("\"")));
                } catch (IOException e) {
                        e.printStackTrace();
                } finally {
                        try {
                                is.close();
                                br.close();
                        } catch (IOException e) {
                                e.printStackTrace();
                        }
                }
                return wm;
        }

        public static void main(String[] args) {

        }
}