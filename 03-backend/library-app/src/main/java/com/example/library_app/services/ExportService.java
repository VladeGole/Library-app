package com.example.library_app.services;

import com.example.library_app.util.ExportUtils;
import com.opencsv.CSVWriter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Objects;

@Service
public class ExportService {


/*
    public <T> byte[] export(List<T> object, String fileType, String sheetName, List<String> fieldsToExport) throws IOException {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        if (CollectionUtils.isEmpty(object)) {
            return outputStream.toByteArray();
        }

            if (ExportUtils.isCSVFileType(fileType)) {
                CSVWriter csvWriter = new CSVWriter(new OutputStreamWriter(outputStream));

                if (!CollectionUtils.isEmpty(object)) {
                    csvWriter.writeAll();
                }
            } else if (ExportUtils.isXLSXFileType(fileType)) {
                Workbook workbook = new XSSFWorkbook();
                Sheet sheet = workbook.createSheet(sheetName);

                if (!CollectionUtils.isEmpty(object)) {
                    populateXLSXSheet(object, sheet, workbook, fieldsToExport);
                }

                workbook.write(outputStream);
                workbook.close();
            }

    }

    public <T> void populateXLSXSheet(List<T> object, Sheet sheet, Workbook workbook, List<String> fieldToExports) {
        if (!CollectionUtils.isEmpty(object)) {

            Row headerRow = sheet.createRow(0);
            populateXLSXHeader(headerRow, object.stream().findFirst().get(), fieldToExports);

            int rowNumber = 1;
            for (T objectToExport : object) {
                Row row = sheet.createRow(rowNumber++);
                populateXLSXValue(row, objectToExport, fieldToExports);
            }
        }
    }

    private <T> void populateXLSXValue(Row row, T objectToExport, List<String> fieldToExports) {
        

    }

    public <T> void populateXLSXHeader(Row headerRow, T object, List<String> fieldsToExport) {

        if (Objects.isNull(headerRow)) {
            return;
        }
        int i = 0;
        for (Field field : object.getClass().getDeclaredFields()) {
            if (ExportUtils.listContainsFieldOrEmpty(fieldsToExport, field.getName())) {
                if (ExportUtils.isPrimitiveWrapper(field.getType()) && !ExportUtils.isCollectionArrayOrMap(field.getType())) {
                    headerRow.createCell(i).setCellValue(createHeaderName(field.getName()));
                    i++;
                }
            }
        }
    }
    private String createHeaderName(String name) {
        return ExportUtils.createFieldKeyFromName(name);
    }

 */
}

