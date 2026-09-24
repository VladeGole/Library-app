package com.example.library_app.util;

import com.example.library_app.enums.ExportTypeEnum;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ExportUtils {

    public static boolean isCSVFileType(String type) {
        return type.equalsIgnoreCase(ExportTypeEnum.CSV.toString());
    }

    public static boolean isXLSXFileType(String type) {
        return type.equalsIgnoreCase(ExportTypeEnum.CSV.toString());
    }

    public static boolean listContainsFieldOrEmpty(List<String> list, String s) {
        return CollectionUtils.isEmpty(list) || list.contains(s);
    }

    public static boolean isCollectionArrayOrMap(Class<?> type) {
        return Collection.class.isAssignableFrom(type) || Map.class.isAssignableFrom(type) || type.isArray();
    }

    public static boolean isPrimitiveWrapper(Class<?> type) {
            return String.class == type || BigDecimal.class == type ||
                    Integer.class == type || int.class == type ||
                    Double.class == type || double.class == type ||
                    Boolean.class == type || boolean.class == type ||
                    Byte.class == type || byte.class == type ||
                    Short.class == type || short.class == type ||
                    Long.class == type || long.class == type ||
                    Float.class == type || float.class == type ||
                    Character.class == type || char.class == type ||
                    Date.class == type || LocalDate.class == type ||
                    LocalDateTime.class == type || LocalTime.class == type;
    }

    public static String createFieldKeyFromName(String name) {
        StringBuilder builder = new StringBuilder();
        String[] tokens = name.split("(?=A-Z)");
        for (int i = 0; i < tokens.length; i++) {
            builder.append(tokens[i].toUpperCase());
            if ( i != tokens.length - 1) {
                builder.append("_");
            }
        }
        return builder.toString();
    }

}
