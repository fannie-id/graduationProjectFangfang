package de.fangfang.backend.service;

import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

@Service
public class ImgUrlService {

    public String urlGenerator(MultipartFile file) throws IOException {

        Cloudinary cloudinary = new Cloudinary();
        return cloudinary.uploader().upload(file.getBytes(), Collections.emptyMap()).get("url").toString();
    }


}
