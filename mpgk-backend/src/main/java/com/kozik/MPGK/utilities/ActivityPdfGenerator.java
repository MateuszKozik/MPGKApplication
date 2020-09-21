package com.kozik.MPGK.utilities;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.kozik.MPGK.entities.Activity;

public class ActivityPdfGenerator {

    public static ByteArrayInputStream generateActivityReport(List<ActivityObject> activityObjects) throws IOException {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        boolean isEmsr = false;
        boolean isSetting = false;
        if (!activityObjects.isEmpty()) {
            isEmsr = activityObjects.get(0).getShowEmsr();
            isSetting = activityObjects.get(0).getShowSetting();
        }

        try {
            String inspectionName = "";
            PdfPTable table;
            if (isEmsr || isSetting) {
                table = new PdfPTable(5);
                table.setWidthPercentage(100);
                table.setWidths(new int[] { 4, 2, 2, 2, 2 });

            } else {
                table = new PdfPTable(3);
                table.setWidthPercentage(100);
                table.setWidths(new int[] { 4, 3, 3 });
            }

            BaseFont helvetica = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1250, BaseFont.EMBEDDED);
            Font headFont = new Font(helvetica, 10, Font.NORMAL);
            PdfPCell hcell;

            hcell = new PdfPCell(new Phrase("Czynność", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            hcell.setPadding(8);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Rodzaj pola", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            hcell.setPadding(8);
            table.addCell(hcell);

            if (isEmsr || isSetting) {
                hcell = new PdfPCell(new Phrase("EMSR", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                hcell.setPadding(8);
                table.addCell(hcell);

                hcell = new PdfPCell(new Phrase("Nastawa", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                hcell.setPadding(8);
                table.addCell(hcell);
            }

            hcell = new PdfPCell(new Phrase("Elementy listy", headFont));
            hcell.setPadding(8);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            for (ActivityObject object : activityObjects) {
                inspectionName = object.getActivityGroup().getConnection().getName();

                PdfPCell cell;

                cell = new PdfPCell(new Phrase(object.getActivityGroup().getName(), headFont));
                cell.setBorderWidthRight(0);
                cell.setPadding(8);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                cell = new PdfPCell();
                cell.setPadding(8);
                cell.setBorderWidthRight(0);
                cell.setBorderWidthLeft(0);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                if (isEmsr && isSetting) {
                    cell = new PdfPCell();
                    cell.setPadding(8);
                    cell.setBorderWidthRight(0);
                    cell.setBorderWidthLeft(0);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);

                    cell = new PdfPCell();
                    cell.setPadding(8);
                    cell.setBorderWidthRight(0);
                    cell.setBorderWidthLeft(0);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);
                }

                cell = new PdfPCell();
                cell.setPadding(8);
                cell.setBorderWidthLeft(0);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                for (Activity activity : object.getActivities()) {

                    cell = new PdfPCell(new Phrase(activity.getName(), headFont));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    cell.setPadding(8);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(activity.getType(), headFont));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    cell.setPadding(8);
                    table.addCell(cell);

                    if (isEmsr && isSetting) {
                        cell = new PdfPCell(new Phrase(activity.getEmsr(), headFont));
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setPadding(8);
                        table.addCell(cell);

                        cell = new PdfPCell(new Phrase(activity.getSetting(), headFont));
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setPadding(8);
                        table.addCell(cell);
                    }

                    cell = new PdfPCell(new Phrase(activity.getListItems(), headFont));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    cell.setPadding(8);
                    table.addCell(cell);
                }
            }

            PdfWriter.getInstance(document, out);
            document.open();
            Paragraph title = new Paragraph(inspectionName, headFont);
            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);
            document.add(Chunk.NEWLINE);
            document.add(table);
            document.add(Chunk.NEWLINE);

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter patern = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
            String formattedDate = now.format(patern);

            document.add(Chunk.NEWLINE);
            Paragraph date = new Paragraph("Wygenerowano: " + formattedDate, headFont);
            date.setAlignment(Element.ALIGN_CENTER);
            document.add(date);

            document.close();

        } catch (DocumentException ex) {

        }
        return new ByteArrayInputStream(out.toByteArray());
    }

}
