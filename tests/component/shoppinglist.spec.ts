import { render, fireEvent, waitFor, RenderResult, getByText } from '@testing-library/vue';
import '@testing-library/jest-dom'
import ShoppingList from '@/components/ShoppingList.vue';
import AppService from '@/appservices/AppService';
import ShoppingListItem from '@/appservices/ShoppingListItem';
import flushPromises from 'flush-promises';
import { Component } from 'vue';
jest.mock('@/appservices/AppService');

describe('Shopping list', () => {
    let rend: RenderResult;
    let appService = new AppService();
    describe("an item is added", () => {
        beforeEach(() => {
            appService.add = jest.fn(() => new Promise(jest.fn()));
            appService.getItems = jest.fn(() => new Promise(() => []));
            // eslint-disable-next-line
            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });
        });

        it("should have an input without any initial value", () => {
            const input = rend.getByRole('itemInput');

            expect(input).toBeInTheDocument();
            expect(input).not.toHaveValue();
            expect(input).not.toHaveValue();
        });

        it("should have a label with describing the input", () => {
            const input = rend.getByLabelText('Please, write the name of the item:');

            expect(input).toBeInTheDocument();
            expect(input).not.toHaveValue();
            expect(input).not.toHaveValue();
        });

        it("should have a button to add items", () => {

            const addItemButton = rend.getByRole('addButton');

            expect(addItemButton).toBeInTheDocument();
        });

        it("should disable the button when the input is empty", () => {
            const input = rend.getByRole('itemInput');
            fireEvent.input(input, { target: { value: '' } });

            const addItemButton = rend.getByRole('addButton');

            expect(input).not.toHaveValue();
            expect(addItemButton).toBeDisabled();
        });

        it.each([
            ["less than 1 character", "a"],
            ["one space", " "],
            ["some spaces and characters", "  aa11"]

        ])("should disable the button when the input is %s = '%s' and show a message", async (_: string, param: string) => {
            const input = rend.getByRole('itemInput');
            await fireEvent.input(input, { target: { value: param } });

            const addItemButton = rend.getByRole('addButton');

            await waitFor(async () => {
                expect(input).toHaveValue(param);
                expect(addItemButton).toBeDisabled();
                expect(rend.getByText('The text must start with A-Z, a-z or a number but no spaces before the first character')).toBeInTheDocument();
            });
        });

        it("should enable the button when the input is not empty", () => {
            const input = rend.getByRole('itemInput');
            fireEvent.input(input, { target: { value: 'bread' } });

            const addItemButton = rend.getByRole('addButton');

            expect(input).toHaveValue();
            waitFor(() => {
                expect(addItemButton).toBeEnabled();
            })
        });

        it("should not have any value in the input when the button is clicked", async () => {
            const input = rend.getByRole('itemInput');
            fireEvent.input(input, { target: { value: 'bread' } });
            const addItemButton = rend.getByRole('addButton');

            fireEvent.click(addItemButton);

            await waitFor(() => {
                expect(input).not.toHaveValue();
            })
        });

        it("should shown the headers of the Shopping list empty when there is not elements", async () => {
            const itemHeader = rend.queryAllByText('Item');
            const quantityHeader = rend.queryAllByText('Quantity');

            expect(itemHeader.length).toBe(1);
            expect(quantityHeader.length).toBe(1);
        });

        it("should shown an item when a new element is added", async () => {
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
            const input = await rend.getByRole('itemInput');
            await fireEvent.input(input, { target: { value: 'bread' } });
            const addItemButton = rend.getByRole('addButton');

            await fireEvent.click(addItemButton);

            await waitFor(() => {
                expect(rend.getByText('bread')).toBeInTheDocument();
                expect(rend.getByText('1')).toBeInTheDocument();
            });
        });
    });

    describe("items are deleted", () => {
        it("should have a button to delete all items disabled when there are not items", () => {
            appService.add = jest.fn(() => new Promise(jest.fn()));
            appService.getItems = jest.fn(() => new Promise(() => []));
            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });
            const deleteAllButton = rend.getByRole('deleteAllButton');
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

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });

            //await flushPromises();                        
            const deleteAllButton = rend.getByRole('deleteAllButton');
            expect(deleteAllButton).toBeInTheDocument();
            await waitFor(() => {
                expect(deleteAllButton).toBeEnabled();
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

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });

            const deleteAllButton = rend.getByRole('deleteAllButton');
            await fireEvent.click(deleteAllButton);
            let questionForm: HTMLElement;
            await waitFor(() => {
                questionForm = rend.getByRole('questionForm')
                expect(questionForm).toBeInTheDocument();
            });

            const cancelButton = rend.getByText("Cancel");
            await fireEvent.click(cancelButton);

            await waitFor(() => {
                expect(questionForm).not.toBeInTheDocument();
            });
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

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });

            const deleteAllButton = rend.getByRole('deleteAllButton');
            await fireEvent.click(deleteAllButton);
            const cancelButton = rend.getByText("Cancel");
            await fireEvent.click(cancelButton);

            await waitFor(() => {
                expect(rend.getByText('bread')).toBeInTheDocument();
                expect(rend.getByText('5')).toBeInTheDocument();
                expect(rend.getByText('milk')).toBeInTheDocument();
                expect(rend.getByText('3')).toBeInTheDocument();
                expect(rend.getByText('carrots')).toBeInTheDocument();
                expect(rend.getByText('6')).toBeInTheDocument();
            });
        });

        it("should stop showing the question form if the user accept delete all", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));
            shoppingList.push(new ShoppingListItem("milk", 3));
            shoppingList.push(new ShoppingListItem("carrots", 6));
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });

            const deleteAllButton = rend.getByRole('deleteAllButton');
            await fireEvent.click(deleteAllButton);
            let questionForm: HTMLElement;
            await waitFor(() => {
                questionForm = rend.getByRole('questionForm')
                expect(questionForm).toBeInTheDocument();
            });

            const acceptButton = rend.getByText("Accept");
            await fireEvent.click(acceptButton);

            await waitFor(() => {
                expect(questionForm).not.toBeInTheDocument();
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

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });

            let bread: HTMLElement;
            let milk: HTMLElement;
            let carrots: HTMLElement;
            await waitFor(() => {
                bread = rend.getByText('bread');
                milk = rend.getByText('milk');
                carrots = rend.getByText('carrots');
            });

            shoppingList = new Array<ShoppingListItem>();
            
            const deleteAllButton = rend.getByRole('deleteAllButton');
            await fireEvent.click(deleteAllButton);
            let questionForm: HTMLElement;
            await waitFor(() => {
                questionForm = rend.getByRole('questionForm')
                expect(questionForm).toBeInTheDocument();
            });

            const acceptButton = rend.getByText("Accept");
            await fireEvent.click(acceptButton);
            expect(appService.deleteAll).toBeCalledTimes(1);            
            await waitFor(() => {
                expect(bread).not.toBeInTheDocument();
                expect(milk).not.toBeInTheDocument();
                expect(carrots).not.toBeInTheDocument();
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

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });

            let bread: HTMLElement;            
            await waitFor(() => {
                bread = rend.getByText('bread');                
            });          
            
            const deleteBreadButton = rend.getByRole('deleteItem');            
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

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });

            let bread: HTMLElement;            
            await waitFor(() => {
                bread = rend.getByText('bread');                
            });          
            
            const deleteBreadButton = rend.getByRole('deleteItem');
            await fireEvent.click(deleteBreadButton);
            let questionForm: HTMLElement;
            await waitFor(() => {
                questionForm = rend.getByRole('questionForm')
                expect(questionForm).toBeInTheDocument();
            });

            const cancelButton = rend.getByText("Cancel");
            await fireEvent.click(cancelButton);            
            await waitFor(() => {
                expect(bread).toBeInTheDocument();                
            });
        });

        it("should delete an item if the user accept to delete the item", async () => {
            appService.deleteAll = jest.fn();
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));        
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });

            let bread: HTMLElement;            
            await waitFor(() => {
                bread = rend.getByText('bread');                
            });          
            
            const deleteBreadButton = rend.getByRole('deleteItem');
            shoppingList = new Array<ShoppingListItem>();
            await fireEvent.click(deleteBreadButton);
            let questionForm: HTMLElement;
            await waitFor(() => {
                questionForm = rend.getByRole('questionForm')
                expect(questionForm).toBeInTheDocument();
            });

            const acceptButton = rend.getByText("Accept");
            await fireEvent.click(acceptButton);            
            await waitFor(() => {
                expect(bread).not.toBeInTheDocument();                
            });
        });
    });

    describe("items are updated", () => {
        it("should have a button to decrease the quantity but disable if the quantity is 1", async () => {
            const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 1));                        
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });
            let bread: HTMLElement;            
            await waitFor(() => {
                bread = rend.getByText('bread');                
            });   

            const decreaseItemButton = rend.getByRole('decreaseQuantity');                
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

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });
            let bread: HTMLElement;            
            await waitFor(() => {
                bread = rend.getByText('bread');                
            });   

            const decreaseItemButton = rend.getByRole('decreaseQuantity');                
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

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });
            let bread: HTMLElement;            
            await waitFor(() => {
                bread = rend.getByText('bread');                
            });   

            const increaseItemButton = rend.getByRole('increaseQuantity');                
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

            appService.updateItem = jest.fn(async (item:ShoppingListItem) => new Promise( (resolve) => {                
                shoppingList = [];
                const updatedItem = new ShoppingListItem(item.name, item.quantity)
                shoppingList.push(updatedItem);
                resolve ();
                return updatedItem;
            }));

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });           

            await waitFor(() => {
                expect(rend.getByText('bread')).toBeInTheDocument();                
                expect(rend.getByText('5')).toBeInTheDocument();                
            });   

            const increaseItemButton = rend.getByRole('increaseQuantity');                
            await fireEvent.click(increaseItemButton);            
            
            await waitFor(() => {
                expect(rend.getByText('bread')).toBeInTheDocument();                
                expect(rend.getByText('6')).toBeInTheDocument();                
            });   
        });

        it("should decrease the quantity when the + button is clicked", async () => {
            let shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
            shoppingList.push(new ShoppingListItem("bread", 5));                        
            appService.getItems = jest.fn(() => new Promise((resolve) => {
                resolve(shoppingList);
                return shoppingList;
            }));

            appService.updateItem = jest.fn(async (item:ShoppingListItem) => new Promise( (resolve) => {                
                shoppingList = [];
                const updatedItem = new ShoppingListItem(item.name, item.quantity)
                shoppingList.push(updatedItem);
                resolve ();
                return updatedItem;
            }));

            rend = render(ShoppingList as any, {
                propsData: {
                    appService: appService
                }
            });           

            await waitFor(() => {
                expect(rend.getByText('bread')).toBeInTheDocument();                
                expect(rend.getByText('5')).toBeInTheDocument();                
            });   

            const decreaseItemButton = rend.getByRole('decreaseQuantity');                
            await fireEvent.click(decreaseItemButton);            
            
            await waitFor(() => {
                expect(rend.getByText('bread')).toBeInTheDocument();                
                expect(rend.getByText('4')).toBeInTheDocument();                
            });   
        });
    });
});