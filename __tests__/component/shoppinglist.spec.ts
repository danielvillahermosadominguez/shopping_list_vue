import { render, fireEvent, waitFor, RenderResult} from '@testing-library/vue';
import '@testing-library/jest-dom'
import ShoppingList from '@/components/ShoppingList.vue';
import ShoppingListItem from '@/appservices/ShoppingListItem';

const appServiceMock=   {
    add: {},
    getItems: {},
    deleteAll: {},
    deleteItem: {},
    updateItem: {},
    serverIsReady: {},
};

const $t = (s:string) => s;

describe('Shopping list', () => {
    let rend: RenderResult;
    let appService = appServiceMock;
    const setUpRender = () => {
        return render(ShoppingList as any, {
            propsData: {
                appService: appService,
            },            
            mocks:{ $t }
        });
    };
    
    describe("the initial screen is showed", () => {
        beforeEach(() => {
            jest.resetAllMocks();            
            appService.add = jest.fn(() => new Promise(jest.fn()));
            appService.getItems = jest.fn(() => new Promise(() => []));
            // eslint-disable-next-line
            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                },
                mocks:{ $t }
            });
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it("should have an input without any initial value", () => {
            const { getByRole } = rend;
            const input = getByRole('itemInput');

            expect(input).toBeInTheDocument();
            expect(input).not.toHaveValue();
            expect(input).not.toHaveValue();
        });

        it("should have a label with describing the input", () => {
            const { getByLabelText } = rend;
            const input = getByLabelText($t("shopping-list-please-write-the-name"));

            expect(input).toBeInTheDocument();
            expect(input).not.toHaveValue();
            expect(input).not.toHaveValue();
        });

        it("should shown the headers of the Shopping list empty when there is not elements", async () => {
            const { queryAllByText } = rend;
            const itemHeader = queryAllByText($t("shopping-list-item"));
            const quantityHeader = queryAllByText($t("shopping-list-quantity"));

            expect(itemHeader.length).toBe(1);
            expect(quantityHeader.length).toBe(1);
        });
    });

    describe("an item is added", () => {
        beforeEach(() => {
            appService.add = jest.fn(() => new Promise(jest.fn()));
            appService.getItems = jest.fn(() => new Promise(() => []));
            // eslint-disable-next-line
            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                },
                mocks:{ $t }
            });
        });

        it("should have a button to add items", () => {
            const { getByRole } = rend;
            const addItemButton = getByRole('addButton');

            expect(addItemButton).toBeInTheDocument();
        });

        it("should disable the button when the input is empty", async () => {
            const { getByRole } = rend;
            const input = getByRole('itemInput');
            await fireEvent.input(input, { target: { value: '' } });

            const addItemButton = getByRole('addButton');

            expect(input).not.toHaveValue();
            expect(addItemButton).toBeDisabled();
        });

        it.each([
            ["less than 1 character", "a"],
            ["one space", " "],
            ["some spaces and characters", "  aa11"]

        ])("should disable the button when the input is %s = '%s' and show a message", async (_: string, param: string) => {
            const { getByRole, findByText } = rend;
            const input = getByRole('itemInput');
            await fireEvent.input(input, { target: { value: param } });

            const addItemButton = getByRole('addButton');

            expect(input).toHaveValue(param);
            expect(await findByText($t("validation-the_text_must_start"))).toBeInTheDocument();
            expect(addItemButton).toBeDisabled();
        });

        it("should enable the button when the input is not empty", async () => {
            const { getByRole } = rend;
            const input = getByRole('itemInput');
            await fireEvent.input(input, { target: { value: 'bread' } });

            const addItemButton = getByRole('addButton');

            expect(input).toHaveValue();
            expect(addItemButton).toBeEnabled();
        });

        it("should not have any value in the input when the additem button is clicked", async () => {
            const { getByRole } = rend;
            const input = getByRole('itemInput');
            await fireEvent.input(input, { target: { value: 'bread' } });
            const addItemButton = getByRole('addButton');

            await fireEvent.click(addItemButton);

            expect(input).not.toHaveValue();
        });

        it("should shown an item when a new element is added", async () => {
            const { getByRole, findByText, getByText } = rend;
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            appService.add = async (item: ShoppingListItem) => {
                return new Promise<undefined>((resolve) => {
                    shoppingList.push(item);
                    resolve(undefined);
                    return undefined;
                })
            };

            appService.getItems = jest.fn(async () => new Promise<Array<ShoppingListItem>>((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const input = getByRole('itemInput');
            await fireEvent.input(input, { target: { value: 'bread' } });
            const addItemButton = getByRole('addButton');

            await fireEvent.click(addItemButton);

            expect(await findByText('bread')).toBeInTheDocument();
            expect(getByText('1')).toBeInTheDocument();
        });
    });

    describe("items are deleted", () => {      
        beforeEach(() => {
            jest.resetAllMocks();
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it("should have a button to delete all items disabled when there are not items", () => {
            appService.add = jest.fn(() => new Promise(jest.fn()));
            appService.getItems = jest.fn(() => new Promise(() => []));
            const { getByRole } = setUpRender();

            const deleteAllButton = getByRole('deleteAllButton');

            expect(deleteAllButton).toBeInTheDocument();
            expect(deleteAllButton).toBeDisabled();
        });

        it("should have the button delete all items enabled when there is at least one item in the shopping list", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            shoppingList.push(new ShoppingListItem("milk", 3));
            shoppingList.push(new ShoppingListItem("carrots", 6));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const { getByRole } = setUpRender();

            const deleteAllButton = getByRole('deleteAllButton');
            expect(deleteAllButton).toBeInTheDocument();
            await waitFor(() => {
                expect(deleteAllButton).toBeEnabled();
            });
        });

        it("should show the question form if the user click on delete all", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            shoppingList.push(new ShoppingListItem("milk", 3));
            shoppingList.push(new ShoppingListItem("carrots", 6));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const { getByRole } = setUpRender();

            const deleteAllButton = getByRole('deleteAllButton');
            await fireEvent.click(deleteAllButton);            
            await waitFor(() => {
                expect(getByRole('questionForm')).toBeInTheDocument();
            });
        });


        it("should stop showing the question form if the user refuse delete all", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            shoppingList.push(new ShoppingListItem("milk", 3));
            shoppingList.push(new ShoppingListItem("carrots", 6));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const { getByRole, getByText, queryByRole} = setUpRender();

            const deleteAllButton = getByRole('deleteAllButton');
            await fireEvent.click(deleteAllButton);

            const cancelButton = getByText($t("question-cancel"));
            await fireEvent.click(cancelButton);
            expect(queryByRole('questionForm')).toBeNull();
        });

        it("should, if the user refuse delete all, and not delete anything", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            shoppingList.push(new ShoppingListItem("milk", 3));
            shoppingList.push(new ShoppingListItem("carrots", 6));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));
            const { getByRole, getByText} = setUpRender();
            const deleteAllButton = getByRole('deleteAllButton');
            await fireEvent.click(deleteAllButton);
            const cancelButton = getByText($t("question-cancel"));

            await fireEvent.click(cancelButton);

            expect(getByText('bread')).toBeInTheDocument();
            expect(getByText('5')).toBeInTheDocument();
            expect(getByText('milk')).toBeInTheDocument();
            expect(getByText('3')).toBeInTheDocument();
            expect(getByText('carrots')).toBeInTheDocument();
            expect(getByText('6')).toBeInTheDocument();
        });

        it("should  hide the question form if the user accept delete all", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            shoppingList.push(new ShoppingListItem("milk", 3));
            shoppingList.push(new ShoppingListItem("carrots", 6));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            appService.deleteAll = jest.fn();

            const {queryByRole, getByRole, findByText} = setUpRender();
            const deleteAllButton = getByRole('deleteAllButton');

            await fireEvent.click(deleteAllButton);

            const acceptButton = await findByText($t("question-accept"));
            await fireEvent.click(acceptButton);
            await waitFor(()=>{
                expect(queryByRole('questionForm')).toBeNull();
            });
        });

        it("should delete all if the user accept delete all", async () => {
            appService.deleteAll = jest.fn();
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            shoppingList.push(new ShoppingListItem("milk", 3));
            shoppingList.push(new ShoppingListItem("carrots", 6));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const {queryByText, getByRole, findByText} = setUpRender();

            shoppingList = new Array<ShoppingListItem>();

            const deleteAllButton = getByRole('deleteAllButton');
            await fireEvent.click(deleteAllButton);
            const acceptButton = await findByText($t("question-accept"));

            await fireEvent.click(acceptButton);

            expect(appService.deleteAll).toBeCalledTimes(1);
            await waitFor(() => {
                expect(queryByText('bread')).toBeNull();
                expect(queryByText('milk')).toBeNull();
                expect(queryByText('carrots')).toBeNull();
            });
        });

        it("should exist a button to delete an item", async () => {
            appService.deleteAll = jest.fn();
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const {findByRole} = setUpRender();

            const deleteBreadButton = await findByRole('deleteItem');
            expect(deleteBreadButton).toBeInTheDocument();
        });

        it("should not delete an item if the user refuse to delete the item", async () => {
            appService.deleteAll = jest.fn();
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const {findByRole, findByText, getByText} = setUpRender();

            const deleteBreadButton = await findByRole('deleteItem');
            await fireEvent.click(deleteBreadButton);
            const cancelButton = await findByText($t("question-cancel"));

            await fireEvent.click(cancelButton);

            expect(getByText("bread")).toBeInTheDocument();
            expect(getByText("5")).toBeInTheDocument();
        });

        it("should delete an item if the user accept to delete the item", async () => {
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            appService.deleteItem = jest.fn(()=> shoppingList = new Array<ShoppingListItem>());
            shoppingList.push(new ShoppingListItem("bread", 5));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));            

            const {findByRole, findByText, queryByText} = setUpRender();

            const deleteBreadButton = await findByRole('deleteItem');            
            await fireEvent.click(deleteBreadButton);
            const acceptButton = await findByText($t("question-accept"));

            await fireEvent.click(acceptButton);

            await waitFor(() => {
                expect(queryByText("bread")).toBeNull();
            });
        });
    });

    describe("items are updated", () => {        

        beforeEach(() => {
            jest.resetAllMocks();
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it("should have a button to decrease the quantity but disable if the quantity is 1", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 1));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const {findByRole} = setUpRender();

            const decreaseItemButton = await findByRole('decreaseQuantity');
            expect(decreaseItemButton).toBeInTheDocument();
            expect(decreaseItemButton).toBeDisabled();
        });

        it("should have a button to decrease the quantity but disable if the quantity is >1", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 2));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const {findByRole} = setUpRender();

            const decreaseItemButton = await findByRole('decreaseQuantity');
            expect(decreaseItemButton).toBeInTheDocument();
            expect(decreaseItemButton).toBeEnabled();
        });

        it("should have a button to increase the quantity", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 1));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            const {findByRole} = setUpRender();

            const increaseItemButton = await findByRole('increaseQuantity');
            expect(increaseItemButton).toBeInTheDocument();
            expect(increaseItemButton).toBeEnabled();
        });

        it("should increase the quantity when the + button is clicked", async () => {
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            appService.updateItem = jest.fn(async (item: ShoppingListItem) => new Promise((resolve) => {
                shoppingList = [];
                const updatedItem = new ShoppingListItem(item.name, item.quantity)
                shoppingList.push(updatedItem);
                resolve(undefined);
                return updatedItem;
            }));

            const {findByRole, findByText, getByText} = setUpRender();

            const increaseItemButton = await findByRole('increaseQuantity');

            await fireEvent.click(increaseItemButton);

            expect(await findByText('6')).toBeInTheDocument();
            expect(getByText('bread')).toBeInTheDocument();
        });

        it("should decrease the quantity when the + button is clicked", async () => {
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            appService.updateItem = jest.fn(async (item: ShoppingListItem) => new Promise((resolve) => {
                shoppingList = [];
                const updatedItem = new ShoppingListItem(item.name, item.quantity)
                shoppingList.push(updatedItem);
                resolve(undefined);
                return updatedItem;
            }));

            const {findByRole, findByText, getByText} = setUpRender();

            const decreaseItemButton = await findByRole('decreaseQuantity');
            await fireEvent.click(decreaseItemButton);

            expect(await findByText('4')).toBeInTheDocument();
            expect(getByText('bread')).toBeInTheDocument();
        });

        it("should change the name when the edit button is clicked", async () => {
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            const item = new ShoppingListItem("bread", 5);
            item.id = "1";
            shoppingList.push(item);
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            appService.updateItem = jest.fn(async (item: ShoppingListItem) => new Promise((resolve) => {
                shoppingList = [];
                const updatedItem = new ShoppingListItem(item.name, item.quantity)
                updatedItem.id = item.id;
                shoppingList.push(updatedItem);
                resolve(undefined);
                return updatedItem;
            }));

            const {findByRole, findByText, getByText} = setUpRender();

            let editItemButton = await findByRole('editItem');
            await fireEvent.click(editItemButton);
            let inputEdit = await findByRole('nameInput');
            await fireEvent.input(inputEdit, { target: { value: 'milk' } });
            let acceptButton = await findByText($t("question-accept"));
            await fireEvent.click(acceptButton);

            expect(await findByText('milk')).toBeInTheDocument();
            expect(getByText('5')).toBeInTheDocument();
        });

        it("should not be able to change the name when the name don't match with the validation", async () => {
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            const item = new ShoppingListItem("bread", 5);
            item.id = "1";
            shoppingList.push(item);
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            appService.updateItem = jest.fn(async (item: ShoppingListItem) => new Promise((resolve) => {
                shoppingList = [];
                const updatedItem = new ShoppingListItem(item.name, item.quantity)
                updatedItem.id = item.id;
                shoppingList.push(updatedItem);
                resolve(undefined);
                return updatedItem;
            }));

            const {findByRole, findByText, getByText} = setUpRender();

            let editItemButton = await findByRole('editItem');
            await fireEvent.click(editItemButton);

            let inputEdit = await findByRole('nameInput');
            await fireEvent.input(inputEdit, { target: { value: '2' } });

            let acceptButton = await findByText($t("question-accept"));

            expect(acceptButton).toBeDisabled();
            expect(getByText($t("validation-the_text_must_start"))).toBeInTheDocument();
        });
    });
});