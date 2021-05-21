import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import { ResponseProps } from "../App";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const Row: React.FC<{
  row: any;
  sectionHeader: string;
  sectionColumns: string[];
}> = ({ row, sectionHeader, sectionColumns }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.attributes.titles[0].title}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {sectionHeader}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {sectionColumns.map((column, index) =>
                      index >=
                      sectionColumns.length - sectionColumns.length / 2 ? (
                        <TableCell align="center" key={column + index}>
                          {column}
                        </TableCell>
                      ) : (
                        <TableCell key={column + index}>{column}</TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.attributes.publisher}
                    </TableCell>
                    <TableCell>{row.attributes.publicationYear}</TableCell>
                    <TableCell align="right">
                      <span>
                        {row.attributes.subjects
                          .reduce(
                            (
                              accumulator: string,
                              value: { subject: string }
                            ) => {
                              return accumulator + "," + value.subject;
                            },
                            ""
                          )
                          .substring(1)}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <a href={row.attributes.url}>Open</a>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CollapsibleTable: React.FC<{
  data: ResponseProps;
  loadedStatus: string;
  tableHeaderColumns: string[];
  collapsibleSectionHeader: string;
  collapsibleSectionColumnHeaders: string[];
}> = ({
  data,
  loadedStatus,
  tableHeaderColumns,
  collapsibleSectionHeader,
  collapsibleSectionColumnHeaders,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            {tableHeaderColumns.map((column, index) => (
              <TableCell key={column + index} align="center">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loadedStatus === "loaded" && typeof data?.data !== "undefined"
            ? data?.data.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  sectionHeader={collapsibleSectionHeader}
                  sectionColumns={collapsibleSectionColumnHeaders}
                />
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
