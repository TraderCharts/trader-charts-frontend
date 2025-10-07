import React, {useState} from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {MenuItem} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledAutoSuggestContainer = styled("div")({
    flexGrow: 1,
    position: "relative",
    height: 250,
});

const StyledSuggestionsContainer = styled(Paper)({
    position: "absolute",
    zIndex: 1,
    marginTop: 8, // antes theme.spacing(1)
    left: 0,
    right: 0,
});

const StyledSuggestion = styled(MenuItem)({
    display: "block",
});

const suggestionsListStyle = {margin: 0, padding: 0, listStyleType: "none"};

const suggestions = [
    {label: "Afghanistan"},
    {label: "Aland Islands"},
    {label: "Albania"},
    {label: "Algeria"},
    {label: "American Samoa"},
    {label: "Andorra"},
    {label: "Angola"},
    {label: "Anguilla"},
    {label: "Antarctica"},
    {label: "Antigua and Barbuda"},
    {label: "Argentina"},
    {label: "Armenia"},
    {label: "Aruba"},
    {label: "Australia"},
    {label: "Austria"},
    {label: "Azerbaijan"},
    {label: "Bahamas"},
    {label: "Bahrain"},
    {label: "Bangladesh"},
    {label: "Barbados"},
    {label: "Belarus"},
    {label: "Belgium"},
    {label: "Belize"},
    {label: "Benin"},
    {label: "Bermuda"},
    {label: "Bhutan"},
    {label: "Bolivia, Plurinational State of"},
    {label: "Bonaire, Sint Eustatius and Saba"},
    {label: "Bosnia and Herzegovina"},
    {label: "Botswana"},
    {label: "Bouvet Island"},
    {label: "Brazil"},
    {label: "British Indian Ocean Territory"},
    {label: "Brunei Darussalam"},
];

const IntegrationAutosuggest = () => {
    const [value, setValue] = useState("");
    const [suggestionsState, setSuggestionsState] = useState([]);

    const getSuggestions = (val) => {
        const inputValue = val.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : suggestions.filter((suggestion) => {
                const keep =
                    count < 5 &&
                    suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;
                if (keep) count += 1;
                return keep;
            });
    };

    const handleSuggestionsFetchRequested = ({value}) => {
        setSuggestionsState(getSuggestions(value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestionsState([]);
    };

    const handleChange = (event, {newValue}) => {
        setValue(newValue);
    };

    const renderInput = (inputProps) => {
        const {ref, ...other} = inputProps;
        return <TextField fullWidth InputProps={{inputRef: ref}} {...other} />;
    };

    const renderSuggestion = (suggestion, {query, isHighlighted}) => {
        const matches = match(suggestion.label, query);
        const parts = parse(suggestion.label, matches);

        return (
            <StyledSuggestion selected={isHighlighted} component="div">
                <div>
                    {parts.map((part, index) =>
                            part.highlight ? (
                                <span key={index} style={{fontWeight: 300}}>
                {part.text}
              </span>
                            ) : (
                                <strong key={index} style={{fontWeight: 500}}>
                                    {part.text}
                                </strong>
                            )
                    )}
                </div>
            </StyledSuggestion>
        );
    };

    return (
        <StyledAutoSuggestContainer>
            <Autosuggest
                suggestions={suggestionsState}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={handleSuggestionsClearRequested}
                getSuggestionValue={(s) => s.label}
                renderInputComponent={renderInput}
                renderSuggestion={renderSuggestion}
                renderSuggestionsContainer={(options) => {
                    const {containerProps, children} = options;
                    return <StyledSuggestionsContainer {...containerProps}>{children}</StyledSuggestionsContainer>;
                }}
                theme={{
                    suggestionsList: suggestionsListStyle,
                    suggestion: "ignored", // ya lo estilizamos con StyledSuggestion
                }}
                inputProps={{
                    placeholder: "Search a country (start with a)",
                    value,
                    onChange: handleChange,
                }}
            />
        </StyledAutoSuggestContainer>
    );
};

IntegrationAutosuggest.propTypes = {};

export default IntegrationAutosuggest;
