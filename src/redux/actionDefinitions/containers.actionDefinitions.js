export const SHOW_PAGES = "@definition/SHOW_PAGES";

export const showPageDefinition = (show, pageName) => ({
    type: SHOW_PAGES,
    payload: {pageName, show}
});
