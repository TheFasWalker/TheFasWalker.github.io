import React from "react";
import { NavLink } from "react-router-dom";
import { Header } from "src/components/header-2/Header";
import { Layout } from "src/components/lauout/Layout";

export const HomePage = () => {
    return (
        <>
            <Header/>
            <Layout>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos officiis, ut accusamus, velit aut eos quis optio libero maxime dicta ea laboriosam necessitatibus incidunt voluptatibus voluptate ad? Magnam veritatis eveniet quo culpa sapiente eum porro nemo, vero quae, quas voluptates dolores. Doloribus voluptate, quis sed facere delectus beatae. Enim, ducimus.
            
            <NavLink to="/profile?modal=true"> ССылка на окно с  открытам попапом</NavLink>
            
            </Layout>

        </>
    )
}