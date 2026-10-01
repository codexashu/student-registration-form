#!/usr/bin/env python3
"""
Automated Test Suite for Student Registration Webpage
Tests whether index.html exists and contains all required HTML elements,
fields, inputs, and form controls.
"""

import os
import unittest
from html.parser import HTMLParser

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_FILE_PATH = os.path.join(BASE_DIR, "index.html")


class HTMLStructureParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.elements = []  # list of tuples: (tag, attrs_dict)
        self.has_doctype = False
        self.title_text = ""
        self._in_title = False

    def handle_decl(self, decl):
        if decl.lower().startswith("doctype html"):
            self.has_doctype = True

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.tags.append(tag)
        self.elements.append((tag, attrs_dict))
        if tag == "title":
            self._in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title_text += data


class TestStudentRegistrationHTML(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html_exists = os.path.isfile(HTML_FILE_PATH)
        cls.html_content = ""
        cls.parser = HTMLStructureParser()

        if cls.html_exists:
            with open(HTML_FILE_PATH, "r", encoding="utf-8") as f:
                cls.html_content = f.read()
            cls.parser.feed(cls.html_content)

    def test_01_html_file_exists(self):
        """Verify that index.html exists in the repository root."""
        self.assertTrue(
            self.html_exists,
            f"Required file 'index.html' not found at path: {HTML_FILE_PATH}"
        )

    def test_02_html_file_not_empty(self):
        """Verify that index.html is not empty."""
        self.assertTrue(
            len(self.html_content.strip()) > 0,
            "The file 'index.html' is empty."
        )

    def test_03_doctype_and_title(self):
        """Verify standard HTML5 DOCTYPE and a descriptive title."""
        self.assertTrue(
            self.parser.has_doctype or "<!DOCTYPE html>" in self.html_content or "<!doctype html>" in self.html_content.lower(),
            "Missing standard HTML5 <!DOCTYPE html> declaration."
        )
        self.assertIn("title", self.parser.tags, "Missing <title> tag in index.html.")
        self.assertIn(
            "registration",
            self.parser.title_text.lower(),
            f"Title should mention 'registration', found: '{self.parser.title_text}'"
        )

    def test_04_form_element_exists(self):
        """Verify that a <form> element exists with appropriate attributes."""
        forms = [attrs for tag, attrs in self.parser.elements if tag == "form"]
        self.assertGreater(
            len(forms), 0, "No <form> tag found in index.html."
        )
        
        # Check that form has an id or name
        has_identifier = any("id" in f or "name" in f for f in forms)
        self.assertTrue(has_identifier, "Form tag should have an 'id' or 'name' attribute.")

    def test_05_name_input_exists(self):
        """Verify that an input field for Student Name exists."""
        name_inputs = [
            attrs for tag, attrs in self.parser.elements
            if tag == "input" and (
                "fullname" in attrs.get("name", "").lower() or
                "fullname" in attrs.get("id", "").lower() or
                "firstname" in attrs.get("name", "").lower() or
                "firstname" in attrs.get("id", "").lower() or
                "name" == attrs.get("name", "").lower()
            )
        ]
        self.assertGreater(
            len(name_inputs), 0,
            "Missing name input field (expected id or name with 'fullName' or 'firstName')."
        )

    def test_06_email_input_exists(self):
        """Verify that an email input field exists with type='email'."""
        email_inputs = [
            attrs for tag, attrs in self.parser.elements
            if tag == "input" and attrs.get("type", "").lower() == "email"
        ]
        self.assertGreater(
            len(email_inputs), 0,
            "Missing input field of type='email' for student email address."
        )

    def test_07_phone_input_exists(self):
        """Verify that a phone number input field exists."""
        phone_inputs = [
            attrs for tag, attrs in self.parser.elements
            if tag == "input" and (
                attrs.get("type", "").lower() == "tel" or
                "phone" in attrs.get("name", "").lower() or
                "phone" in attrs.get("id", "").lower()
            )
        ]
        self.assertGreater(
            len(phone_inputs), 0,
            "Missing phone input field (type='tel' or id/name containing 'phone')."
        )

    def test_08_dob_input_exists(self):
        """Verify that Date of Birth input exists."""
        dob_inputs = [
            attrs for tag, attrs in self.parser.elements
            if tag == "input" and (
                attrs.get("type", "").lower() == "date" or
                "dob" in attrs.get("name", "").lower() or
                "dob" in attrs.get("id", "").lower()
            )
        ]
        self.assertGreater(
            len(dob_inputs), 0,
            "Missing date input field for Date of Birth (type='date' or id/name='dob')."
        )

    def test_09_gender_selection_exists(self):
        """Verify that Gender selection controls exist (radio buttons or select)."""
        gender_radios = [
            attrs for tag, attrs in self.parser.elements
            if tag == "input" and attrs.get("type", "").lower() == "radio" and "gender" in attrs.get("name", "").lower()
        ]
        gender_select = [
            attrs for tag, attrs in self.parser.elements
            if tag == "select" and "gender" in attrs.get("name", "").lower()
        ]
        self.assertTrue(
            len(gender_radios) >= 2 or len(gender_select) > 0,
            "Missing gender selection options (radio buttons with name='gender' or select dropdown)."
        )

    def test_10_course_program_selection_exists(self):
        """Verify that Course / Program select dropdown exists with options."""
        selects = [
            attrs for tag, attrs in self.parser.elements
            if tag == "select" and (
                "course" in attrs.get("name", "").lower() or
                "course" in attrs.get("id", "").lower() or
                "program" in attrs.get("name", "").lower()
            )
        ]
        self.assertGreater(
            len(selects), 0,
            "Missing <select> dropdown for Course / Program selection."
        )

        options = [attrs for tag, attrs in self.parser.elements if tag == "option"]
        self.assertGreater(
            len(options), 2,
            "Course select should have multiple <option> choices."
        )

    def test_11_address_field_exists(self):
        """Verify that Address textarea or input exists."""
        address_fields = [
            attrs for tag, attrs in self.parser.elements
            if (tag == "textarea" and "address" in (attrs.get("name", "") + attrs.get("id", "")).lower()) or
               (tag == "input" and "address" in (attrs.get("name", "") + attrs.get("id", "")).lower())
        ]
        self.assertGreater(
            len(address_fields), 0,
            "Missing address field (<textarea> or <input> with id/name 'address')."
        )

    def test_12_submit_button_exists(self):
        """Verify that a submit button exists."""
        submit_buttons = [
            attrs for tag, attrs in self.parser.elements
            if (tag == "button" and attrs.get("type", "submit").lower() == "submit") or
               (tag == "input" and attrs.get("type", "").lower() == "submit")
        ]
        self.assertGreater(
            len(submit_buttons), 0,
            "Missing submit button (<button type='submit'> or <input type='submit'>)."
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
