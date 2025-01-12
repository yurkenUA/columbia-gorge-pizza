import {
    Container,
    Filters,
    ProductsGroupList,
    Title,
    TopBar,
} from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title
                    text="All The Pizza"
                    size="lg"
                    className="font-extrabold"
                />
            </Container>
            <TopBar />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[70px]">
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Pizza"
                                items={[
                                    {
                                        id: 1,
                                        name: "Pepperoni Pizza",
                                        items: [
                                            {
                                                price: 12.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 2,
                                        name: "Pepperoni Pizza 2",
                                        items: [
                                            {
                                                price: 19.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 3,
                                        name: "Pepperoni Pizza 3",
                                        items: [
                                            {
                                                price: 17.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 4,
                                        name: "Pepperoni Pizza 4",
                                        items: [
                                            {
                                                price: 16.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 5,
                                        name: "Pepperoni Pizza 5",
                                        items: [
                                            {
                                                price: 15.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 6,
                                        name: "Pepperoni Pizza 6",
                                        items: [
                                            {
                                                price: 14.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                ]}
                                categoryId={1}
                            />

                            <ProductsGroupList
                                title="Combo"
                                items={[
                                    {
                                        id: 1,
                                        name: "Pepperoni Pizza",
                                        items: [
                                            {
                                                price: 12.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 2,
                                        name: "Pepperoni Pizza 2",
                                        items: [
                                            {
                                                price: 19.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 3,
                                        name: "Pepperoni Pizza 3",
                                        items: [
                                            {
                                                price: 17.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 4,
                                        name: "Pepperoni Pizza 4",
                                        items: [
                                            {
                                                price: 16.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 5,
                                        name: "Pepperoni Pizza 5",
                                        items: [
                                            {
                                                price: 15.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                    {
                                        id: 6,
                                        name: "Pepperoni Pizza 6",
                                        items: [
                                            {
                                                price: 14.99,
                                            },
                                        ],
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
                                    },
                                ]}
                                categoryId={2}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
