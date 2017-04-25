
const table_sel = '#schematic_table'

$(document).ready(function () {
  $(table_sel).DataTable({
    ajax: '/api/schematics/',
    "sAjaxDataProp": '',
    columns: [
      { data: 'title',
        "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
          $(nTd).html("<a href="+oData.schematic_url+" target='_blank'>"+oData.title+"</a>")
        }
      },
      { data: 'author' },
      { data: 'company' }
    ],
    initComplete: function () {
      this.api().columns().every(function () {
        var column = this;
        var select = $('<select><option value=""></option></select>')
          .appendTo($(column.footer()).empty())
          .on('change', function () {
            var val = $.fn.dataTable.util.escapeRegex(
              $(this).val()
            );

            column
              .search(val ? '^' + val + '$' : '', true, false)
              .draw();
          });

        column.data().unique().sort().each(function (d, j) {
          select.append('<option value="' + d + '">' + d + '</option>')
        });
      });
    }
  });
});