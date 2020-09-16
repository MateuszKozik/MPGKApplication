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
import com.kozik.MPGK.entities.Inspection;

public class InspectionPdfGenerator {

    private static String formatDate(String datetime, boolean showHours) {
        LocalDateTime time = LocalDateTime.parse(datetime);
        DateTimeFormatter patern;
        if (showHours) {
            patern = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        } else {
            patern = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        }

        return time.format(patern);
    }

    public static ByteArrayInputStream generateInspectionReport(List<InspectionObject> inspections) throws IOException {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        boolean isEmsr = false;
        boolean isSetting = false;
        if (!inspections.isEmpty()) {
            isEmsr = inspections.get(1).getShowEmsr();
            isSetting = inspections.get(1).getShowSetting();
        }

        try {
            String inspectionStartDate = "";
            String inspectionEndDate = "";
            String inspectionName = "";
            PdfPTable table;
            if (isEmsr && isSetting) {
                table = new PdfPTable(6);
                table.setWidthPercentage(100);
                table.setWidths(new int[] { 4, 2, 2, 2, 2, 2 });

            } else {
                table = new PdfPTable(4);
                table.setWidthPercentage(100);
                table.setWidths(new int[] { 4, 2, 2, 2 });
            }

            BaseFont helvetica = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1250, BaseFont.EMBEDDED);
            Font headFont = new Font(helvetica, 10, Font.NORMAL);
            PdfPCell hcell;

            hcell = new PdfPCell(new Phrase("Czynność", headFont));
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

            hcell = new PdfPCell(new Phrase("Parametr", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            hcell.setPadding(8);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Uwagi", headFont));
            hcell.setPadding(8);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Potwierdzenie wykonania", headFont));
            hcell.setPadding(8);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            for (InspectionObject object : inspections) {
                inspectionName = object.getActivityGroup().getConnection().getName();

                PdfPCell cell;

                cell = new PdfPCell(new Phrase(object.getActivityGroup().getName(), headFont));
                cell.setBorderWidthRight(0);
                cell.setPadding(8);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                if (isEmsr || isSetting) {
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

                cell = new PdfPCell();
                cell.setPadding(8);
                cell.setBorderWidthLeft(0);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                for (Inspection inspection : object.getInspections()) {

                    inspectionStartDate = inspection.getStartTime();
                    inspectionEndDate = inspection.getEndTime();

                    cell = new PdfPCell(new Phrase(inspection.getActivity().getName(), headFont));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    cell.setPadding(8);
                    table.addCell(cell);

                    if (isEmsr && isSetting) {
                        cell = new PdfPCell(new Phrase(inspection.getActivity().getEmsr(), headFont));
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setPadding(8);
                        table.addCell(cell);

                        cell = new PdfPCell(new Phrase(inspection.getActivity().getSetting(), headFont));
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setPadding(8);
                        table.addCell(cell);
                    }

                    if (inspection.getParameter() != null && inspection.getParameter().equals("true")) {
                        cell = new PdfPCell(new Phrase("Zaznaczono", headFont));
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setPadding(8);
                        table.addCell(cell);
                    } else {
                        cell = new PdfPCell(new Phrase(inspection.getParameter(), headFont));
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setPadding(8);
                        table.addCell(cell);
                    }

                    cell = new PdfPCell(new Phrase(inspection.getComment(), headFont));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    cell.setPadding(8);
                    table.addCell(cell);

                    if (inspection.getPerson() != null) {
                        cell = new PdfPCell(
                                new Phrase(inspection.getPerson().getName() + " " + inspection.getPerson().getSurname()
                                        + "\n\n" + formatDate(inspection.getDatetime(), true), headFont));
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setPadding(8);
                        table.addCell(cell);
                    } else {
                        cell = new PdfPCell();
                        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        cell.setPadding(8);
                        table.addCell(cell);
                    }
                }
            }

            PdfWriter.getInstance(document, out);
            document.open();
            Paragraph title = new Paragraph(inspectionName, headFont);
            title.setAlignment(Element.ALIGN_CENTER);

            Paragraph header = new Paragraph("Data przeglądu: " + formatDate(inspectionStartDate, false) + " do "
                    + formatDate(inspectionEndDate, false), headFont);
            header.setAlignment(Element.ALIGN_CENTER);

            document.add(title);
            document.add(Chunk.NEWLINE);
            document.add(header);
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
