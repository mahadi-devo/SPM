import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

function CustomTable(props) {
  const { footer, cation, headColor, rows, cols } = props;

  return (
    <Table variant='simple'>
      {cation && <TableCaption>{cation}</TableCaption>}
      <Thead backgroundColor={headColor ? headColor : ''}>
        <Tr>
          {cols.map((column, c) => {
            return (
              <Th key={c} isNumeric={column.isNumeric}>
                {column.title}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row, i) => {
          return (
            <Tr key={i}>
              {cols.map((column, c) => {
                return (
                  <Td isNumeric={column.isNumeric} key={c}>
                    {column.render(row)}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
      {footer && (
        <Tfoot>
          <Tr>
            {footer.map((col) => (
              <Th>{col}</Th>
            ))}
          </Tr>
        </Tfoot>
      )}
    </Table>
  );
}

export default CustomTable;
