<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Từ điển</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{name: 'eng_vie'}" class="nav-link">
                    Eng-Vie
                    <font-awesome-icon icon="fa-solid fa-address-book" />
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'eng_vie'}" class="nav-link">
                    Esp-Vie
                    <font-awesome-icon icon="fa-solid fa-address-book" />
                </router-link>
            </li>
        </div>
    </nav>
</template>