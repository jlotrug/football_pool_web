export const manageVisibility = (makeVisible, visibleClass, hideArray) => {
    makeVisible(visibleClass)

    hideArray.forEach(element => {
        element('hide-element')
    });
}