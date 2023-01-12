package de.fangfang.backend.exception;

public class DeedIdNotFoundException extends RuntimeException {

    public DeedIdNotFoundException() {
        super("Id not found");
    }
}
