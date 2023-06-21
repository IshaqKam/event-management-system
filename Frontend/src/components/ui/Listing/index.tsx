import jsPDF from 'jspdf';
import { Link } from 'components';
import { Card } from 'components';
import { Workbook } from 'exceljs';
import { memo, useMemo } from 'react';
import { APP_URL } from 'constants/environment';
import { ExportingEvent } from 'devextreme/ui/data_grid';
import { exportDataGrid as PDFDataExporter } from 'devextreme/pdf_exporter';
import { exportDataGrid as ExcelDataExporter } from 'devextreme/excel_exporter';
import DataGrid, {
  Column,
  Grouping,
  Selection,
  Pager,
  Paging,
  SearchPanel,
  IColumnProps,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.blue.light.css';

type Props<TList> = {
  columns: IColumnProps[];
  url?: string;
  content: TList[];
  selection?: boolean;
  onSelection?: (list: TList[]) => void;
  customURL?: (item: string) => string;
};

const ListComponent = <TList extends { _id?: string }>({
  url,
  columns,
  content,
  selection,
  onSelection,
  customURL,
}: Props<TList>) => {
  const memoizedColumns = useMemo(
    () =>
      columns.map((item, index) => (
        <Column key={index} dataType="string" {...item} />
      )),
    [columns],
  );

  const viewColumn = useMemo(
    () =>
      url || customURL ? (
        <Column
          dataField="action"
          caption={'Action'}
          cellRender={({
            data,
          }: {
            data: (typeof content)[number];
          }): JSX.Element => {
            if (customURL && data._id)
              return <Link href={customURL(data._id)} text={'View'} />;
            return <Link href={`${url}/${data._id}`} text={'View'} />;
          }}
        />
      ) : null,
    [customURL, url],
  );

  const onExporting = (ev: ExportingEvent<TList, any>) => {
    if (ev.format === 'pdf') {
      const doc = new jsPDF();
      PDFDataExporter({
        jsPDFDocument: doc,
        indent: 5,
        component: ev.component,
        customizeCell({ pdfCell, gridCell }) {
          if (gridCell && gridCell.column && pdfCell) {
            if (
              pdfCell.text &&
              gridCell.rowType === 'data' &&
              gridCell.column.dataField === 'Phone'
            ) {
              pdfCell.text = pdfCell.text.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '($1) $2-$3',
              );
            } else if (gridCell.rowType === 'group') {
              pdfCell.backgroundColor = '#BEDFE6';
            } else if (pdfCell.font && gridCell.rowType === 'totalFooter') {
              pdfCell.font.style = 'italic';
            }
          }
        },
        customDrawCell(options) {
          const { gridCell, pdfCell, rect } = options;
          if (
            gridCell &&
            pdfCell &&
            gridCell.column &&
            gridCell.rowType === 'data' &&
            gridCell.column.dataField === 'action'
          ) {
            options.cancel = true;
            doc.setFontSize(11);
            doc.setTextColor('#0000FF');

            const link = customURL
              ? APP_URL + customURL(gridCell.data.id)
              : `${APP_URL + url}/${gridCell.data.id}`;

            if (pdfCell.padding && rect)
              doc.textWithLink(
                'link',
                rect.x + (pdfCell.padding.left ?? 0),
                rect.y + rect.h / 1.5,
                { url: link },
              );
          }
        },
      }).then(() => {
        doc.save('data.pdf');
      });
      return;
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    ExcelDataExporter({
      component: ev.component,
      worksheet,
      autoFilterEnabled: true,
      customizeCell({ gridCell, excelCell }) {
        if (gridCell && gridCell.column && gridCell.rowType === 'data') {
          if (gridCell.column.dataField === 'Phone') {
            excelCell.value = parseInt(gridCell.value, 10);
            excelCell.numFmt = '[<=9999999]###-####;(###) ###-####';
          }
          if (gridCell.column.dataField === 'action') {
            const link = customURL
              ? APP_URL + customURL(gridCell.data.id)
              : `${APP_URL + url}/${gridCell.data.id}`;
            if (customURL) {
              excelCell.value = {
                text: 'Link',
                hyperlink: link,
              };
            } else excelCell.value = { text: 'Link', hyperlink: link };

            excelCell.font = { color: { argb: 'FF0000FF' }, underline: true };
            excelCell.alignment = { horizontal: 'left' };
          }
        }
      },
    }).then(() => {
      workbook.xlsx.writeBuffer().then(buffer => {
        const { saveAs } = require('file-saver');
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'DataGrid.xlsx',
        );
      });
    });
    ev.cancel = true;
  };

  return (
    <Card>
      <DataGrid
        showBorders={true}
        dataSource={content}
        hoverStateEnabled={true}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        onExporting={onExporting}
        noDataText={'No items available'}
        wordWrapEnabled={true}
        onSelectionChanged={({ selectedRowsData }) => {
          if (onSelection) onSelection(selectedRowsData);
        }}
        export={{
          enabled: true,
          formats: ['pdf', 'xlsx'],
          texts: {
            exportAll: 'Export',
          },
        }}
      >
        <SearchPanel
          visible={true}
          highlightCaseSensitive={true}
          placeholder={'Search'}
        />
        <Grouping autoExpandAll={false} />
        {selection && <Selection mode={'multiple'} allowSelectAll />}
        {memoizedColumns}
        {url || customURL ? viewColumn : null}
        <Pager
          allowedPageSizes={[10, 25, 50, 100]}
          showPageSizeSelector={true}
        />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </Card>
  );
};

export default memo(ListComponent);
