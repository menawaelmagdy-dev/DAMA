import type { UnitTypeKey } from "./content";

export type UnitStatus = "available" | "reserved" | "sold";

export type Unit = {
  id: string;
  building: string;
  floor: string; // label: "GF" | "1" | "2" | "3" | "R"
  unitNo: string;
  type: UnitTypeKey;
  beds: number;
  baths: number;
  area: number; // m² interior
  outdoor: number; // m² garden / terrace / roof
  orientation: string; // "N" | "NE" | "NW"
  status: UnitStatus;
};

/**
 * Rawasin inventory — 6 residential buildings, 4 units per floor.
 * Prices are quoted on request by the sales team, as is standard in the market.
 */
export const units: Unit[] = [
  { id: "A-01", building: "A", floor: "GF", unitNo: "01", type: "ground-garden", beds: 3, baths: 3, area: 138, outdoor: 62, orientation: "N", status: "available" },
  { id: "A-03", building: "A", floor: "GF", unitNo: "03", type: "ground-garden", beds: 3, baths: 3, area: 142, outdoor: 74, orientation: "NE", status: "reserved" },
  { id: "A-11", building: "A", floor: "1", unitNo: "11", type: "typical", beds: 3, baths: 3, area: 146, outdoor: 18, orientation: "N", status: "available" },
  { id: "A-31", building: "A", floor: "3", unitNo: "31", type: "duplex", beds: 4, baths: 4, area: 198, outdoor: 74, orientation: "N", status: "available" },

  { id: "B-02", building: "B", floor: "GF", unitNo: "02", type: "ground-garden", beds: 3, baths: 3, area: 136, outdoor: 58, orientation: "N", status: "sold" },
  { id: "B-12", building: "B", floor: "1", unitNo: "12", type: "typical", beds: 3, baths: 3, area: 150, outdoor: 20, orientation: "NW", status: "available" },
  { id: "B-22", building: "B", floor: "2", unitNo: "22", type: "typical", beds: 3, baths: 3, area: 150, outdoor: 20, orientation: "NW", status: "reserved" },
  { id: "B-32", building: "B", floor: "3", unitNo: "32", type: "duplex", beds: 4, baths: 4, area: 212, outdoor: 88, orientation: "N", status: "available" },

  { id: "C-01", building: "C", floor: "GF", unitNo: "01", type: "ground-garden", beds: 3, baths: 3, area: 132, outdoor: 54, orientation: "NE", status: "available" },
  { id: "C-21", building: "C", floor: "2", unitNo: "21", type: "typical", beds: 3, baths: 3, area: 144, outdoor: 18, orientation: "N", status: "available" },
  { id: "C-41", building: "C", floor: "R", unitNo: "41", type: "duplex", beds: 4, baths: 5, area: 224, outdoor: 96, orientation: "N", status: "available" },

  { id: "D-03", building: "D", floor: "GF", unitNo: "03", type: "ground-garden", beds: 3, baths: 3, area: 140, outdoor: 66, orientation: "N", status: "available" },
  { id: "D-13", building: "D", floor: "1", unitNo: "13", type: "typical", beds: 3, baths: 3, area: 148, outdoor: 19, orientation: "NE", status: "sold" },
  { id: "D-43", building: "D", floor: "R", unitNo: "43", type: "duplex", beds: 4, baths: 4, area: 206, outdoor: 82, orientation: "N", status: "reserved" },

  { id: "E-02", building: "E", floor: "GF", unitNo: "02", type: "ground-garden", beds: 3, baths: 3, area: 134, outdoor: 56, orientation: "N", status: "available" },
  { id: "E-22", building: "E", floor: "2", unitNo: "22", type: "typical", beds: 3, baths: 3, area: 152, outdoor: 21, orientation: "N", status: "available" },

  { id: "F-01", building: "F", floor: "GF", unitNo: "01", type: "commercial", beds: 1, baths: 1, area: 48, outdoor: 0, orientation: "N", status: "available" },
  { id: "F-03", building: "F", floor: "GF", unitNo: "03", type: "commercial", beds: 2, baths: 2, area: 96, outdoor: 0, orientation: "N", status: "available" },
  { id: "F-11", building: "F", floor: "1", unitNo: "11", type: "commercial", beds: 2, baths: 2, area: 112, outdoor: 6, orientation: "N", status: "reserved" },
];

export const buildingList = ["A", "B", "C", "D", "E", "F"];

export const areaRange = {
  min: Math.min(...units.map((u) => u.area)),
  max: Math.max(...units.map((u) => u.area)),
};
