import React from "react";
import { MDBIcon, MDBBtn, MDBTooltip, MDBChipsInput } from "mdbreact";
import memoize from "memoize-one";
import NumberFormat from "react-number-format";
import { BANKS_COUNTRY } from "./data";
export const SESSION_COLUMNS_TABLE = [
  {
    label: "Time",
    field: "aws_created",
    sort: "asc",
    width: 150
  },
  {
    label: "Action",
    field: "position",
    sort: "asc",
    width: 270
  },
  {
    label: "IP Address",
    field: "ipaddress",
    sort: "asc",
    width: 200
  },
  {
    label: "Browser/OS",
    field: "useragent",
    sort: "asc",
    width: 100
  },
  {
    label: "Country",
    field: "region",
    sort: "asc",
    width: 150
  },
  {
    label: "City",
    field: "city",
    sort: "asc",
    width: 100
  }
];

export const CLIENT_COLUMNS_TABLE = memoize(clickHandler => [
  {
    name: "Client Name",
    cell: row => (
      <div>
        {row.name}{" "}
        <MDBIcon
          icon="minus-circle"
          onClick={() => clickHandler(row, true)}
          className="red-text pl-1 cursor remove-emp"
        />
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: false,
    button: false,
    grow: 1,
    sortable: true,
    selector: "name",
    width: "300px"
  },
  {
    name: "Currency",
    selector: "currency",
    sortable: true
  },
  {
    name: "Job Role",
    selector: "job_role",
    sortable: true
  },
  {
    name: (
      <MDBTooltip material placement="top">
        <MDBBtn flat>
          Bank detail <MDBIcon icon="info-circle" className="mr-2" />
        </MDBBtn>
        <p className="font-10">
          Add a distribution in Bank Accounts & Wallets, so that Bitwage can generate unique bank details for you
        </p>
      </MDBTooltip>
    ),
    // selector: "position",
    sortable: false,
    right: true
  },
  {
    name: "Details",
    cell: row => (
      <MDBBtn color="primary" rounded onClick={() => clickHandler(row, false)} size="sm">
        Edit
      </MDBBtn>
    ),
    ignoreRowClick: true,
    allowOverflow: false,
    button: true,
    width: "200px"
  }
]);

export const EMPLOYERS_COLUMNS_TABLE = memoize(clickHandler => [
  {
    name: "Employer Name",
    cell: row => (
      <div>
        {row.name}{" "}
        <MDBIcon
          hidden={row.role === "user"}
          icon="minus-circle"
          onClick={() => clickHandler(row, true)}
          className="red-text pl-1 cursor remove-emp"
        />
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: false,
    button: false,
    width: "300px",
    sortable: true,
    selector: "name"
  },
  {
    name: "Currency",
    selector: "currency",
    sortable: true
  },
  {
    name: "Job Role",
    selector: "job_role",
    sortable: true
  },
  {
    name: (
      <MDBTooltip material placement="top">
        <MDBBtn flat>
          Bank detail <MDBIcon icon="info-circle" className="mr-2" />
        </MDBBtn>
        <p className="font-10">
          Add a distribution in Bank Accounts & Wallets, so that Bitwage can generate unique bank details for you
        </p>
      </MDBTooltip>
    ),
    selector: "position",
    sortable: false,
    right: true
  },
  {
    name: "",
    cell: row => (
      <MDBBtn color="primary" rounded onClick={() => clickHandler(row, false)} size="sm">
        Edit
      </MDBBtn>
    ),
    ignoreRowClick: true,
    allowOverflow: false,
    button: true,
    width: "200px"
  }
]);

export const BANK_ACCOUNTS_TABLE = memoize((clickHandler, boxChangeHandle, handleTagChange, state) => [
  {
    name: "Financial institution",
    cell: row => (
      <div>
        {row.bank_name}
        <MDBIcon
          hidden={row.role === "user"}
          icon="minus-circle"
          onClick={() => clickHandler(row, true)}
          className="red-text pl-1 cursor remove-emp"
        />
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: false,
    button: false,
    width: "300px",
    sortable: true,
    selector: "bank_name"
  },
  {
    name: "Tags",
    cell: row => (
      <div className="form-group chips-tag">
        <span hidden={!state.isSaving}>Savings</span>
        <MDBChipsInput
          hidden={state.isSaving}
          className={row.tag ? "tag-added" : ""}
          placeholder="Enter add tag+"
          handleAdd={value => handleTagChange(row, value, true)}
          handleRemove={value => handleTagChange(row, value, false)}
          secondaryPlaceholder="Enter a tag"
          chipSize="sm"
          chips={row.tag ? row.tag : []}
        />
      </div>
    ),
    allowOverflow: true,
    width: "300px",
    sortable: true,
    selector: "tag"
  },
  {
    name: "Account number",
    cell: row => (
      <div>
        {row.account !== undefined && "**********" + row.account.substr(row.account.length - 4)}
        {row.iban !== undefined && "**********" + row.iban.substr(row.iban.length - 4) }
        {row.clabe !== undefined && "**********" + row.clabe.substr(row.clabe.length - 4) }
        {row.card !== undefined && "**********" + row.card.substr(row.card.length - 4)}
        {row.cbu !== undefined && "**********" + row.cbu.substr(row.cbu.length - 4)}
        
        {/* {row.country === BANKS_COUNTRY.USA && row.aba}
        {row.country === BANKS_COUNTRY.ARGENTINA && row.cbu_number}
        {(row.country === BANKS_COUNTRY.BRAZIL || row.country === BANKS_COUNTRY.CHILE) && row.account_number}
        {row.clabe_number !== undefined ? row.clabe_number : null} */}
      </div>
    ),
    selector: "account",
    allowOverflow: false,
    sortable: true
  },
  {
    name: "Currency",
    cell: row => (
      <div>
        {row.country === BANKS_COUNTRY.USA ? "USD" : null}
        {row.country === BANKS_COUNTRY.GB ? "GBP" : null}
        {row.country === BANKS_COUNTRY.ARGENTINA ? "ARS" : null}
        {row.country === BANKS_COUNTRY.BRAZIL ? "BRL" : null}
        {row.country === BANKS_COUNTRY.CHILE ? "CLP" : null}
        {row.country === BANKS_COUNTRY.UKRAINE ? "UAH" : null}
        {row.country === BANKS_COUNTRY.MEXICO ? "MXN" : null}
        {row.iban !== undefined && row.country !== BANKS_COUNTRY.GB ? "EUR" : null}
      </div>
    ),
    selector: "country",
    sortable: true
  },
  {
    name: (
      <MDBTooltip material placement="top">
        <MDBBtn flat>
          Bank detail <MDBIcon icon="info-circle" className="mr-2" />
        </MDBBtn>
        <p className="font-10">
          Add a distribution in Bank Accounts & Wallets, so that Bitwage can generate unique bank details for you
        </p>
      </MDBTooltip>
    ),
    selector: "bankaccount_id",
    sortable: false,
    right: true
  },
  {
    name: (
      <MDBTooltip material placement="top">
        <MDBBtn flat>
          Allocation <MDBIcon icon="info-circle" className="mr-2" />
        </MDBBtn>
        <p className="font-10">
          Enter the percentage of earnings per paycheck you want to allocate towards each account. <br /> You can add as
          many account as you'd like, but can only allocate towards a maximum of two, or a maximum three if you're a
          Premium subscriber.
          <br /> You can use the same allocations for every employer by checking the checbox above.
        </p>
      </MDBTooltip>
    ),
    cell: row => (
      <div className="allocation-detail">
        <NumberFormat
          disabled={state.isSaving}
          name="allocation"
          className={state.isAllocation ? "allocation-input" : "allocation-input border-red"}
          placeholder="%"
          thousandSeparator={true}
          suffix={"%"}
          value={row.allocation}
          onBlur={event => boxChangeHandle(event, row, true)}
          onValueChange={values => boxChangeHandle(values, row, false)}
        />
        {state.isAllocation ? null : <span className="red-text err-percent">Percentages don't add up to 100</span>}
      </div>
    ),
    selector: "allocation",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "200px"
  }
]);

export const CRYPTO_CURRENCY_TABLE = memoize((clickHandler, boxChangeHandle, handleTagChange, state) => [
  {
    name: "Cryptocurrency",
    cell: row => (
      <div>
        {row.symbol === "BTC" && row.address ? "BTC - Bitcoin (Single Address)" : null}
        {row.symbol === "BTC" && row.address_list ? (<>BTC - Bitcoin (List Address)<MDBBtn color="primary" outline onClick={() => clickHandler(row, false)} size="sm">
          Preview
      </MDBBtn></>) : null}
        {row.symbol === "ETH" ? "ETH - Ether" : null}
        {row.symbol === "BCH" ? "BCH - Bitcoin Cash" : null}
        <MDBIcon
          hidden={row.role === "user"}
          icon="minus-circle"
          onClick={() => clickHandler(row, true)}
          className="red-text pl-1 cursor remove-emp"
        />
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: false,
    button: false,
    width: "350px",
    sortable: true,
    selector: "symbol"
  },
  {
    name: "Tags",
    cell: row => (
      <div className="form-group chips-tag">
        <span hidden={!state.isSaving}>Savings</span>
        <MDBChipsInput
          hidden={state.isSaving}
          className={row.tag ? "tag-added" : ""}
          placeholder="Enter add tag+"
          handleAdd={value => handleTagChange(row, value, true)}
          handleRemove={value => handleTagChange(row, value, false)}
          secondaryPlaceholder="Enter a tag"
          chipSize="sm"
          chips={row.tag ? row.tag : []}
        />
      </div>
    ),
    allowOverflow: true,
    width: "300px",
    sortable: true,
    selector: "name"
  },
  {
    name: "Address",
    cell: row => <div className="form-group chips-tag">{row.address ? row.address : row.address_list[0]}</div>,
    allowOverflow: true,
    sortable: true,
    selector: "address"
  },
  {
    name: (
      <MDBTooltip material placement="top">
        <MDBBtn flat>
          Allocation <MDBIcon icon="info-circle" className="mr-2" />
        </MDBBtn>
        <p className="font-10">
          Enter the percentage of earnings per paycheck you want to allocate towards each account. <br /> You can add as
          many account as you'd like, but can only allocate towards a maximum of two, or a maximum three if you're a
          Premium subscriber.
          <br /> You can use the same allocations for every employer by checking the checbox above.
        </p>
      </MDBTooltip>
    ),
    cell: row => (
      <div className="allocation-detail">
        <NumberFormat
          disabled={state.isSaving}
          name="allocation"
          className={state.isAllocation ? "allocation-input" : "allocation-input border-red"}
          placeholder="%"
          thousandSeparator={true}
          suffix={"%"}
          value={row.allocation}
          onBlur={event => boxChangeHandle(event, row, true)}
          onValueChange={values => boxChangeHandle(values, row, false)}
        />
        {state.isAllocation ? null : <span className="red-text err-percent">Percentages don't add up to 100</span>}
      </div>
    ),
    selector: "allocation",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    right: true,
    width: "200px"
  }
]);
