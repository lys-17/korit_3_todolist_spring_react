package com.example.todo_backend_mariadb.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

// Spring Data Rest를 통해서 REST API로 자동 노출 설정
//@RepositoryRestResource(collectionResourceRel = "todos", path="todos") // 수정했습니다.
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // ex) save(Todo entity), findById(Long id), findAll(), deleteById(Long id) 등

    List<Todo> findByUserOrderByIdDesc(User user);
}