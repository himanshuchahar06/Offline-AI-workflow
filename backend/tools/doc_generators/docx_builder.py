import os
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

class DOCXDeliverableBuilder:
    """Generates professional, styled MRPL-standard Word (.docx) technical inspection and audit reports."""

    @staticmethod
    def create_report(title: str, subtitle: str, summary: str, sections: list[dict], output_path: str) -> str:
        doc = Document()

        # Set page margins
        for section in doc.sections:
            section.top_margin = Inches(0.8)
            section.bottom_margin = Inches(0.8)
            section.left_margin = Inches(0.9)
            section.right_margin = Inches(0.9)

        # Title
        p_title = doc.add_paragraph()
        run_title = p_title.add_run(title)
        run_title.font.name = "Arial"
        run_title.font.size = Pt(22)
        run_title.font.bold = True
        run_title.font.color.rgb = RGBColor(15, 32, 67) # Deep MRPL Industrial Blue
        p_title.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p_title.paragraph_format.space_after = Pt(2)

        # Subtitle
        p_sub = doc.add_paragraph()
        run_sub = p_sub.add_run(subtitle)
        run_sub.font.name = "Arial"
        run_sub.font.size = Pt(12)
        run_sub.font.italic = True
        run_sub.font.color.rgb = RGBColor(100, 110, 120)
        p_sub.paragraph_format.space_after = Pt(16)

        # Classification Callout Box
        table_callout = doc.add_table(rows=1, cols=1)
        table_callout.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = table_callout.cell(0, 0)
        shading_elm = parse_xml(r'<w:shd {} w:fill="F0F4F8"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shading_elm)
        
        p_box = cell.paragraphs[0]
        p_box.paragraph_format.space_before = Pt(6)
        p_box.paragraph_format.space_after = Pt(6)
        run_box = p_box.add_run("CONFIDENTIALITY NOTICE: Sovereign Air-Gapped On-Premise Deliverable | MRPL Asset Integrity Management")
        run_box.font.name = "Arial"
        run_box.font.size = Pt(9.5)
        run_box.font.bold = True
        run_box.font.color.rgb = RGBColor(15, 32, 67)

        doc.add_paragraph().paragraph_format.space_after = Pt(12)

        # Executive Summary Section
        h_exec = doc.add_heading(level=1)
        r_exec = h_exec.add_run("1. Executive Summary")
        r_exec.font.name = "Arial"
        r_exec.font.size = Pt(15)
        r_exec.font.bold = True
        r_exec.font.color.rgb = RGBColor(15, 32, 67)

        p_sum = doc.add_paragraph()
        r_sum = p_sum.add_run(summary)
        r_sum.font.name = "Arial"
        r_sum.font.size = Pt(10.5)
        p_sum.paragraph_format.space_after = Pt(14)

        # Dynamic Sections
        sec_num = 2
        for sec in sections:
            sec_title = sec.get("title", f"Section {sec_num}")
            sec_content = sec.get("content", "")
            sec_table = sec.get("table_data", None)

            h_sec = doc.add_heading(level=1)
            r_sec = h_sec.add_run(f"{sec_num}. {sec_title}")
            r_sec.font.name = "Arial"
            r_sec.font.size = Pt(15)
            r_sec.font.bold = True
            r_sec.font.color.rgb = RGBColor(15, 32, 67)

            if sec_content:
                p_c = doc.add_paragraph()
                r_c = p_c.add_run(sec_content)
                r_c.font.name = "Arial"
                r_c.font.size = Pt(10.5)
                p_c.paragraph_format.space_after = Pt(10)

            # Insert styled table if table_data exists
            if sec_table and isinstance(sec_table, list) and len(sec_table) > 0:
                rows_cnt = len(sec_table)
                cols_cnt = len(sec_table[0])
                table = doc.add_table(rows=rows_cnt, cols=cols_cnt)
                table.alignment = WD_TABLE_ALIGNMENT.CENTER

                for r_idx, row_data in enumerate(sec_table):
                    for c_idx, cell_value in enumerate(row_data):
                        cell_item = table.cell(r_idx, c_idx)
                        cell_item.text = str(cell_value)
                        
                        # Style Header Row
                        if r_idx == 0:
                            shd = parse_xml(r'<w:shd {} w:fill="0F2043"/>'.format(nsdecls('w')))
                            cell_item._tc.get_or_add_tcPr().append(shd)
                            for p in cell_item.paragraphs:
                                for run in p.runs:
                                    run.font.bold = True
                                    run.font.color.rgb = RGBColor(255, 255, 255)
                                    run.font.size = Pt(10)
                        else:
                            # Alternate row shading
                            if r_idx % 2 == 1:
                                shd = parse_xml(r'<w:shd {} w:fill="F8FAFC"/>'.format(nsdecls('w')))
                                cell_item._tc.get_or_add_tcPr().append(shd)

                doc.add_paragraph().paragraph_format.space_after = Pt(12)

            sec_num += 1

        # Save document
        path = Path(output_path)
        path.parent.mkdir(parents=True, exist_ok=True)
        doc.save(str(path))
        return str(path)
