package de.fangfang.backend.exception;

public class IdNotFoundException extends RuntimeException {

    public IdNotFoundException() {
        super("Id not found");
    }
}
