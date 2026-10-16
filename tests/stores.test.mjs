// "Get the book": the decisions that could put a wrong store page or a wrong
// price on the site. Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { priceLine, storeLinks } from "../lib/stores.ts";

const kindle = { format: "kindle", store: "Amazon.de", href: "https://www.amazon.de/dp/EXAMPLE", show: true };
const paperback = { format: "paperback", store: "Amazon.com", href: "https://www.amazon.com/dp/EXAMPLE", show: true };
const hidden = { format: "paperback", store: "Amazon.de", href: "https://www.amazon.de/dp/EXAMPLE", show: false };

test("store links: only while published, only those switched on, only https, in the file's order", () => {
  assert.deepEqual(storeLinks({ publicationStatus: "forthcoming", stores: [kindle] }), []);
  assert.deepEqual(storeLinks({ publicationStatus: "preorder", stores: [kindle] }), []);
  assert.deepEqual(storeLinks({ publicationStatus: "published" }), []);
  assert.deepEqual(storeLinks({ publicationStatus: "published", stores: [kindle, hidden, paperback] }), [kindle, paperback]);
  assert.deepEqual(storeLinks({ publicationStatus: "published", stores: [{ ...kindle, href: "http://insecure.example" }] }), []);
  assert.deepEqual(storeLinks({ publicationStatus: "published", stores: [{ ...kindle, href: "" }] }), []);
});

test("price line: the figure comes from the config, or the line is not printed", () => {
  assert.equal(priceLine("Paperback list price {price}, before VAT and delivery.", "€28.90"), "Paperback list price €28.90, before delivery.");
  assert.equal(priceLine("Paperback list price {price}, before VAT and delivery.", null), null);
  assert.equal(priceLine("Paperback list price {price}, before VAT and delivery.", undefined), null);
  assert.equal(priceLine("Paperback list price {price}, before VAT and delivery.", ""), null);
});
